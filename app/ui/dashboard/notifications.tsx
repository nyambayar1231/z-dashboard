'use client';

import { useEffect } from 'react';

export default function Notifications() {
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        console.log('permission granted', permission);
      });
    }
  });

  return <h1>notifications</h1>;
}
