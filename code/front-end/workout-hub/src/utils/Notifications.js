/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */
 
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css'

// We need to use <NotificationContainer/> in order to see the actual notification

/**
 * @param {string} type type of notification(info, success, warning, error)
 * @param {string} message notification message
 * @param {string} title notification title
 */
export default function notify(type, message, title) {
    switch (type) {
        case 'info':
            NotificationManager.info(message, 3000);
            break;
        case 'success':
            NotificationManager.success(message, title, 3000);
            break;
        case 'warning':
            NotificationManager.warning(message, title, 3000);
            break;
        case 'error':
            NotificationManager.error(message, title, 3000, () => {
                //Callback
            });
            break;
        default: ;
    }
};
