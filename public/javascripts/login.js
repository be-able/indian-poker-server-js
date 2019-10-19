window.onload = function(){
	var form_change = document.getElementById('form-change');
	var header_text = document.getElementById('header-text');
	var a_text = document.getElementById('a-text');
	var login = document.getElementById('login');
	var signup = document.getElementById('signup');
	form_change.onclick = function(){
		//alert(~a_text.innerHTML.indexOf('注册'));
		if(!(~a_text.innerHTML.indexOf('회원가입'))){
			a_text.innerHTML = '회원가입&nbsp;&nbsp;';
			header_text.innerHTML = "로그인";
			form_change.setAttribute('href','#signup');
			login.style.display = 'block';
			signup.style.display = 'none';
		} else {
			a_text.innerHTML = '로그인&nbsp;&nbsp;';
			header_text.innerHTML = "회원가입";
			form_change.setAttribute('href','#login');
			login.style.display = 'none';
			signup.style.display = 'block';
		}
	};
};