# Android Permission

[Manifest.permission](http://developer.android.com/reference/android/Manifest.permission.html)

### [Normal Permissions](http://developer.android.com/guide/topics/security/normal-permissions.html)
---

> The default value. A lower-risk permission that gives requesting applications access to isolated application-level features, with minimal risk to other applications, the system, or the user. The system automatically grants this type of permission to a requesting application at installation, without asking for the user's explicit approval (though the user always has the option to review these permissions before installing). 

As of API level 23, the following permissions are classified as PROTECTION_NORMAL:

```
ACCESS_LOCATION_EXTRA_COMMANDS
ACCESS_NETWORK_STATE
ACCESS_NOTIFICATION_POLICY
ACCESS_WIFI_STATE
BLUETOOTH
BLUETOOTH_ADMIN
BROADCAST_STICKY
CHANGE_NETWORK_STATE
CHANGE_WIFI_MULTICAST_STATE
CHANGE_WIFI_STATE
DISABLE_KEYGUARD
EXPAND_STATUS_BAR
GET_PACKAGE_SIZE
INSTALL_SHORTCUT
INTERNET
KILL_BACKGROUND_PROCESSES
MODIFY_AUDIO_SETTINGS
NFC
READ_SYNC_SETTINGS
READ_SYNC_STATS
RECEIVE_BOOT_COMPLETED
REORDER_TASKS
REQUEST_IGNORE_BATTERY_OPTIMIZATIONS
REQUEST_INSTALL_PACKAGES
SET_ALARM
SET_TIME_ZONE
SET_WALLPAPER
SET_WALLPAPER_HINTS
TRANSMIT_IR
UNINSTALL_SHORTCUT
USE_FINGERPRINT
VIBRATE
WAKE_LOCK
WRITE_SYNC_SETTINGS
```

### Dangerous Permissions
---

> A higher-risk permission that would give a requesting application access to private user data or control over the device that can negatively impact the user. Because this type of permission introduces potential risk, the system may not automatically grant it to the requesting application. For example, any dangerous permissions requested by an application may be displayed to the user and require confirmation before proceeding, or some other approach may be taken to avoid the user automatically allowing the use of such facilities. 

- READ\_PHONE\_STATE

	Allows read only access to phone state.
	> **Note**: If both your minSdkVersion and targetSdkVersion values are set to 3 or lower, the system implicitly grants your app this permission. If you don't need this permission, be sure your targetSdkVersion is 4 or higher.
	
	Constant Value: "android.permission.READ_SMS"
	
- ACCESS\_COARSE\_LOCATION

	允许 App 访问粗略位置

- ACCESS\_FINE\_LOCATION

	允许 App 访问精确位置
	
- CALL_PHONE
	
	Allows an application to initiate a phone call without going through the Dialer user interface for the user to confirm the call.

- READ\_EXTERNAL\_STORAGE

	Allows an application to read from external storage.

	Any app that declares the WRITE_EXTERNAL_STORAGE permission is implicitly granted this permission.

	This permission is enforced starting in API level 19. Before API level 19, this permission is not enforced and all apps still have access to read from external storage. You can test your app with the permission enforced by enabling Protect USB storage under Developer options in the Settings app on a device running Android 4.1 or higher.

	Also starting in API level 19, this permission is not required to read/write files in your application-specific directories returned by getExternalFilesDir(String) and getExternalCacheDir().

	> **Note**: If both your minSdkVersion and targetSdkVersion values are set to 3 or lower, the system implicitly grants your app this permission. If you don't need this permission, be sure your targetSdkVersion is 4 or higher.

- WRITE\_EXTERNAL\_STORAGE

	Allows an application to write to external storage.

	> **Note**: If both your minSdkVersion and targetSdkVersion values are set to 3 or lower, the system implicitly grants your app this permission. If you don't need this permission, be sure your targetSdkVersion is 4 or higher.

	Starting in API level 19, this permission is not required to read/write files in your application-specific directories returned by getExternalFilesDir(String) and getExternalCacheDir().
	
### Signature
---

> A permission that the system grants only if the requesting application is signed with the same certificate as the application that declared the permission. If the certificates match, the system automatically grants the permission without notifying the user or asking for the user's explicit approval. 

- WRITE_SETTINGS

	Allows an application to read or write the system settings.

	> **Note**: If the app targets API level 23 or higher, the app user must explicitly grant this permission to the app through a permission management screen. The app requests the user's approval by sending an intent with action ACTION_MANAGE_WRITE_SETTINGS. The app can check whether it has this authorization by calling Settings.System.canWrite().

### SignatureOrSystem
---

> A permission that the system grants only to applications that are in the Android system image or that are signed with the same certificates as those in the system image. Please avoid using this option, as the signature protection level should be sufficient for most needs and works regardless of exactly where applications are installed. The "signatureOrSystem" permission is used for certain special situations where multiple vendors have applications built into a system image and need to share specific features explicitly because they are being built together. 

	
