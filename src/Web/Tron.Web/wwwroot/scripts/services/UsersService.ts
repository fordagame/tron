namespace Tron {
    export class UsersService {
        private app: DCore
        private static user: User;
        constructor(app: DCore) {
            this.app = app;
        }

        getUser(): User {
            if (!UsersService.user) {
                let cookieService: CookieService = this.app.services.get<CookieService>("cookies");
                let name: string = cookieService.getCookie("name");
                let id: number = parseInt(cookieService.getCookie("id"));
                UsersService.user = new User();
                UsersService.user.name = name;
                UsersService.user.id = id;
            }
            return UsersService.user;
        }
    }
}