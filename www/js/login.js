'use strict';
app.controller('loginCtrl', function($scope, Current, users, dialogService) {
    $scope.signIn = function() {
		dialogService.confirm('ログインしてもよろしいですか？');
		$scope.$on('confirm:ok', function() {
			users.loginAsEmail($scope.login.email, $scope.login.password);
			$scope.$on('login_complate', function(event, data) {
				Current.setCurrent(data, true);
				$scope.toHome();
                $scope.$emit('toHome:success', 'ログインしました');
			});
            
            $scope.$on('process:fail', function(event, err) {
                var msg = 'ログインに失敗しました。';
                if (err.status == '401') {
                    msg = 'メールアドレスもしくはパスワードが違います。';
                }
                dialogService.error(msg);
            });
		});
    }
});
