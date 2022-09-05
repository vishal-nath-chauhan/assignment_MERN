export const CookieHandler = (action, payload) => {
	switch (action) {
		case "set":
			if (payload.days) {
				var date = new Date();
				date.setTime(date.getTime() + payload.days * 24 * 60 * 60 * 1000);
				var expires = "; expires=" + date.toGMTString();
			} else expires = "";

			document.cookie = payload.name + "=" + payload.value + expires + "; path=/";
			break;

		case "get":
			var nameEQ = payload.name + "=";
			var ca = document.cookie.split(";");
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) === " ") c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		case "delete":
			document.cookie = payload.name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
			break;

		default:
			return;
	}
};
