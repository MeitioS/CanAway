// DarkThemeToggle.tsx
import React, { useState } from 'react';
import { IonItem, IonLabel, IonToggle } from '@ionic/react';

const DarkThemeToggle: React.FC = () => {
  const [darkMode, setDark] = useState(false);

  const toggleDarkMode = () => {
    console.log('Toggle dark mode');
    setDark(!darkMode);
    if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  }

  return (
    <IonItem className="sidebar-item">
      <IonLabel>Dark Theme</IonLabel>
      <IonToggle slot="end" checked={darkMode} onIonChange={toggleDarkMode}></IonToggle>
    </IonItem>
  );
};

export default DarkThemeToggle;
