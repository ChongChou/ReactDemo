package com.talent.nativelib;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.talent.nativelib.modules.RNSharedPreferencesModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created zhouchong on 17/3/29.
 * react-native调用native module需要使用的ReactPackage类
 */

public class RNNativePackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        // add modules here
        modules.add(new RNSharedPreferencesModule(reactContext));
        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
