/*global angular*/
angular.module('pillbox', ['key-enter']);

/*
 tags {Array}
 data-show-remove-tag-button {true | false}
 show-input-field {true | false}
 data-on-click {function}
 data-on-add {function}
 data-on-remove {function}
 
 usage: 
 <pillbox tags="tags" data-show-remove-tag-button="true" data-show-input-field="true" data-on-click="onTagClick(tag)" data-on-add="onTagAdd(tag)" ></pillbox>
 
*/
angular.module('pillbox').directive('pillbox', function () {
    'use strict';
    
    return {
        restrict: 'AE',
        
        require: 'keyEnter',
        
        replace: true,
        
        template:   '<ul class="pillbox-container">' +
                        '<li data-ng-repeat="tag in tags" data-ng-click="clickTag(tag);">' +
                            '<span data-ng-bind="tag"></span>' +
                            '<a data-ng-show="showRemoveTagButton" data-ng-click="removeTag(tag);">x</a></li>' +
                        '<li class="new-tag" data-ng-show="showInputField">' +
                            '<input type="text" data-key-enter data-key13="addTag();" data-key188="addTag();" placeholder="Add a tag" data-ng-model="newTagValue" />' +
                        '</li>' +
                    '</ul>',
        
        scope: {
            tags: '=',
            onClick: '&',
            onAdd: '&',
            onRemove: '&'
        },
        
        link: function (scope, element, attrs) {
            
            scope.showRemoveTagButton = true;
            
            if (attrs.showRemoveTagButton) {
                scope.showRemoveTagButton = (attrs.showRemoveTagButton === 'true');
            }
            
            scope.showInputField = true;
            
            if (attrs.showInputField) {
                scope.showInputField = (attrs.showInputField === 'true');
            }
            
            scope.clickTag = function (tag) {
                scope.onClick({ tag: tag });
            };
            
            scope.addTag = function () {
                var i = 0, found = false;
                
                if (!scope.tags) {
                    scope.tags = [];
                }
                
                for (i = 0; i < scope.tags.length; i += 1) {
                    if (scope.tags[i] === scope.newTagValue) {
                        found = true;
                        break;
                    }
                }
                
                if (!found && scope.newTagValue) {
                    scope.tags.push(scope.newTagValue);
                    
                    scope.onAdd({ tag: scope.newTagValue });
                }
                
                scope.newTagValue = '';
            };
            
            scope.removeTag = function (tag) {
                var i = 0;
                
                for (i = 0; i < scope.tags.length; i += 1) {
                    if (scope.tags[i] === tag) {
                        scope.tags.splice(i, 1);
                        
                        scope.onRemove({ tag: tag });
                        
                        break;
                    }
                }
            };
            
        }
    };
    
});