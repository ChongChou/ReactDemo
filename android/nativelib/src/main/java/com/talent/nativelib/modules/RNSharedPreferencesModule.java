package com.talent.nativelib.modules;

import android.content.Context;
import android.content.SharedPreferences;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.talent.nativelib.sdk.Constants;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

public class RNSharedPreferencesModule extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "SharedPreferences";

    private static final String KEY_CONSTANTS = "NativeConstants";

    private SharedPreferences mSharedPreferences;

    public RNSharedPreferencesModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mSharedPreferences = reactContext.getSharedPreferences(Constants.SHARED_NAME, Context.MODE_PRIVATE);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> constants = new HashMap<>();
        String json = mSharedPreferences.getString(KEY_CONSTANTS, "");
        constants.put(KEY_CONSTANTS, json);
        return constants;
    }

    @ReactMethod
    public void saveString(String key, String value) {
        mSharedPreferences.edit().putString(key, value).apply();
    }

    @ReactMethod
    public void getString(String key, String defValue, Callback callback) {
        String value = mSharedPreferences.getString(key, defValue);
        if (callback != null) {
            callback.invoke(value);
        }
    }

    @ReactMethod
    public void clear() {
        mSharedPreferences.edit().clear().apply();
    }
}
