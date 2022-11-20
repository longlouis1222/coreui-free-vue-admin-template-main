let MyConfig = {}

//Nhận 1 trong các giá trị sau: test | production
let environment = 'test'

if (environment == 'test') {
  MyConfig.language = 'vi'
  MyConfig.pathDefault = '/' //Đường dẫn được thêm sau vào domain, default: '/', ex: '/gen/vue-form/'
  MyConfig.defaultRouter = '/admin/hello' //router trang mặc định khi vào ở trạng thái http://domain.com/, default: '/admin/home', không có / cuối
  MyConfig.environment = 'test'
}

if (environment == 'production') {
  MyConfig.language = 'vi'
  MyConfig.pathDefault = '/' //Đường dẫn được thêm sau vào domain, default: '/', ex: '/gen/vue-form/'
  MyConfig.defaultRouter = '/admin/hello' //router trang mặc định khi vào ở trạng thái http://domain.com/, default: '/admin/home', không có / cuối
  MyConfig.environment = 'production'
}

window.MyConfig = MyConfig
