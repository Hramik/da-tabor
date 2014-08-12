'use strict';


angular.module('daTabor', [])
    .directive('daTabs', function ($compile) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function ($scope, $element, $attrs, Global) {
                $scope.global = Global;
                var tabs = $scope.tabs = [];

                $scope.select = function (tab) {
                    angular.forEach(tabs, function (tab) {
                        tab.selected = false;
                    });
                    tab.selected = true;
                    $scope.current_tab = tab;
                }

                this.addTab = function (tab) {
                    if (tabs.length == 0) $scope.select(tab);
                    tabs.push(tab);
                }
            },
            template: '<div class="da-tabs">' +
                '<div class="da-tabs_header">' +
                '<div class="da-tab_title" ng-class="{selected: tab_item.selected}" ng-repeat="tab_item in tabs" ng-click="select(tab_item)">{? tab_item.name ?}</div>' +
                '</div>' +
                '<div class="da-tabs_body" ng-transclude></div>' +
                '</div>',
            replace: true
        };
    })
    .directive('daTab', function () {
        return {
            require: '^da-tabs',
            restrict: 'E',
            transclude: true,
            scope: {
                name: '@'
            },
            link: function ($scope, $element, $attrs, da_tabsCtrl) {
                da_tabsCtrl.addTab($scope);
            },
            template: '<div class="da-tab" ng-transclude ng-show="selected"></div>',
            replace: true
        };
    });