# [RxJava & OkHttp：带进度更新的文件下载](https://groups.google.com/forum/#!topic/rxjava/aqDM7Eq3zT8)

```java
public Observable<DownloadInfo> downloadFile(final String source, final File targetFile) {
    final Request request = new Request.Builder()
            .url(source)
            .build();

    return executeRequest(request)
            .flatMap(new Func1<Response, Observable<DownloadInfo>>() {
                @Override
                public Observable<DownloadInfo> call(Response response) {
                    return copyResponseToFile(response, targetFile);
                }
            })
            .sample(500, TimeUnit.MILLISECONDS);
}

public Observable<Response> executeRequest(final Request request) {
    return Observable.fromCallable(new Callable<Response>() {
        @Override
        public Response call() throws Exception {
            return okHttpClient.newCall(request).execute();
        }
    });
}

private final Observable<DownloadInfo> copyResponseToFile(final Response response, final File file) {
    return Observable.create(new OkIoDownloadProgressOnSubscribe(response, file));
}

final class OkIoDownloadProgressOnSubscribe implements Observable.OnSubscribe<DownloadInfo> {
    private final Response response;
    private final File targetFile;

    public OkIoDownloadProgressOnSubscribe(Response response, File targetFile) {
        this.response = response;
        this.targetFile = targetFile;
    }

    @Override
    public void call(Subscriber<? super DownloadInfo> subscriber) {
        if (response.isSuccessful()) {
            subscriber.onNext(new RequestSuccessful());

            Timber.d("request was successful");
            Timber.d("downloading to: %s", targetFile.toString());

            final long length = response.body().contentLength();
            Timber.d("total size: %d", length);

            BufferedSource source = response.body().source();
            try {
                BufferedSink sink = Okio.buffer(Okio.sink(targetFile));

                long downloadedTotal = 0;
                long downloadedSinceLastOnNext = 0;

                // make sure that we are cancelable at "any" time
                while (!subscriber.isUnsubscribed()) {

                    long bytesRead = source.read(sink.buffer(), 4096);

                    if (bytesRead == -1) {
                        break;
                    }

                    downloadedTotal += bytesRead;
                    downloadedSinceLastOnNext += bytesRead;

                    if (downloadedSinceLastOnNext > 300000) {
                        downloadedSinceLastOnNext = 0;
                        subscriber.onNext(new Downloading(downloadedTotal, length));
                        Timber.d("downloaded so far: %d", downloadedTotal);
                    }
                }

                source.close();
                sink.close();

                if (!subscriber.isUnsubscribed()) {
                    subscriber.onNext(new Downloading(downloadedTotal, length));
                    subscriber.onCompleted();
                }

            } catch (IOException e) {
                if (!subscriber.isUnsubscribed()) {
                    subscriber.onError(e);
                }
            }
        } else {
            subscriber.onNext(new DownloadError(response));
        }
    }
}
```