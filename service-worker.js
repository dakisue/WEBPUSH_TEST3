'use strict';

self.addEventListener('push', function(event) {
  console.log('Received a push message', event);
  var title = '○○技報　最新刊のご案内';
  var body = '特集：○○分野の新技術の発表';
  var icon = 'mori.png';
  var tag = 'simple-push-demo-notification-tag';
   
  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();
  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === '/' && 'focus' in client) {
        return client.focus();
      }
    }
    if (clients.openWindow) {
      return clients.openWindow('https://www.catapoke.com/private/viewer/?open=46658');
    }
  }));
});
