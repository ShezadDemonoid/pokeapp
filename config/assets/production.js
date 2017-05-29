'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.min.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
      ],
      js: [
        'public/lib/angular/angular.min.js',
        'public/lib/angular-resource/angular-resource.min.js',
        'public/lib/angular-animate/angular-animate.min.js',
        'public/lib/angular-messages/angular-messages.min.js',
        'public/lib/angular-ui-router/release/angular-ui-router.min.js',
        'public/lib/angular-ui-utils/ui-utils.min.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'public/lib/angular-file-upload/angular-file-upload.min.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/angular-toastr/dist/angular-toastr.js',
        'public/lib/angular-toastr/dist/angular-toastr.tpls.js',
        'public/lib/angular-loading-bar/build/loading-bar.js',
        'public/lib/angular-aria/angular-aria.js',
        'public/lib/ngToast/dist/ngToast.js',
        'public/lib/angularytics/dist/angularytics.js',
        'public/lib/rltm/angular-chat/angular-chat.js',
        'maps.googleapis.com/maps/api/js',
        'public/lib/lodash/dist/lodash.underscore.js',
        'public/lib/angular-google-maps/dist/angular-google-maps.js',
        'public/lib/ngmap/build/scripts/ng-map.js',
        'public/lib/ngmap/build/scripts/ng-map.min.js',
        'public/lib/chart.js/dist/Chart.js',
        'public/lib/angular-chart.js/dist/angular-chart.js',

      ]
    },
    css: 'public/dist/application.min.css',
    js: 'public/dist/application.min.js'
  }
};
