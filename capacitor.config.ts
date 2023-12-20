import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ionic.CanAway',
  appName: 'CanAway',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
