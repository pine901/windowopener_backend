# Window Opener

### Pre-Configured with

- Laravel 8
- Laravel Sanctum for SPA Auth
- React 17
- Redux 
- React Router
- Route-Level Code-Splitting
- Axios
- [Ant Design](https://github.com/ant-design/ant-design)
- [Redux Saga](https://redux-saga.js.org/)
- [Sass](https://sass-lang.com/)
- [ESLint](https://github.com/eslint/eslint)
- Preconfigured redux store, actions and saga.

### Pre-Configured Modules

- User Login
- User SignUp
- Auth Routes

## Quick Start

### Laravel Development Environment setup

You can choose either one for your development
1. [Laravel Homestead](https://laravel.com/docs/8.x/homestead)
2. [Laravel Sail](https://laravel.com/docs/8.x/sail)

### Required setup before clone
1. [Composer 2](https://getcomposer.org/download/). 
2. [Node](https://nodejs.org/en/) stable version.

## Usage
1. Clone repo
```
git clone https://github.com/WhiteBoardCrypto/GrandpasDashboard
```
2. Install using composer `composer install`
3. Run `yarn install`
4. Create a Database
5. Update the Database credential to .env file
6. Run `php artisan migrate` -> To create needed tables.
7. Run `php artisan db:seed` -> To seed some fake users.
8. Run `yarn run dev`
9. Update API HOST_URL in `resources/js/config/constant.js` file
10. Update API KEYS in .env file
11. Register background tasks on the server `* * * * * php /path/to/artisan schedule:run 1>> /dev/null 2>&1`
