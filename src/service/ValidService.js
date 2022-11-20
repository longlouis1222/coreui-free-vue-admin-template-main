import LanguageService from './LanguageService'
let ValidService = {}
ValidService.required = {
  required: true,
  message: LanguageService.lang.valid_required,
  trigger: 'blur',
}
ValidService.requiredChange = {
  required: true,
  message: LanguageService.lang.valid_requiredChange,
  trigger: 'change',
}
ValidService.requiredNoMessage = {
  required: true,
  message: ' ',
  trigger: 'blur',
}
ValidService.requiredUpload = {
  required: true,
  message: 'Vui lòng chọn File',
  trigger: 'blur',
}
ValidService.checkNotSpecialCharacters = {
  pattern:
    /^[\sa-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
  message: 'Không được nhập ký tự đặc biệt',
  trigger: 'blur',
}
ValidService.checkAz09 = {
  pattern: /^[0-9a-zA-Z]+$/g,
  message: LanguageService.lang.valid_az09,
  trigger: 'blur',
}
ValidService.check_Az09 = {
  pattern: /^[\w]+$/g,
  message: 'Chỉ được nhập a-z, A-Z, 0-9, _',
  trigger: 'blur',
}
ValidService.checkAz09Dot = {
  pattern: /^[\d.\.]$/g,
  message: LanguageService.lang.valid_az09Dot,
  trigger: 'blur',
}
ValidService.checkAccount = {
  pattern: /^[0-9a-zA-Z.@]+$/g,
  message: LanguageService.lang.valid_account,
  trigger: 'blur',
}
ValidService.checkPhone = {
  pattern: /^(0|\+?84|0084)\d{9}$/,
  message: LanguageService.lang.valid_phone,
  trigger: 'blur',
}
ValidService.checkNumber = {
  pattern: /^\d+$/,
  message: LanguageService.lang.valid_number,
  trigger: 'blur',
}
ValidService.checkNumberFloatNotNegative = {
  pattern: /^[\d.]+$/,
  message: LanguageService.lang.valid_floatNegative,
  trigger: 'blur',
}
ValidService.checkNumberInteger = {
  pattern: /^[-]?[\d]+$/,
  message: LanguageService.lang.valid_integer,
  trigger: 'blur',
}
ValidService.checkNumberFloat = {
  pattern: /^[-]?[\d.]+$/,
  message: LanguageService.lang.valid_float,
  trigger: 'blur',
}
ValidService.checkEmail = {
  pattern:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  message: LanguageService.lang.valid_email,
  trigger: 'blur',
}
ValidService.checkSign = {
  pattern:
    /^[^ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ]*$/g,
  message: LanguageService.lang.valid_sign,
  trigger: 'blur',
}
ValidService.checkSpaceString = {
  pattern: /\S/g,
  message: LanguageService.lang.valid_space,
  trigger: 'blur',
}

ValidService.checkSpaceStringCenter = {
  pattern: /^\S+$/g,
  message: LanguageService.lang.valid_space,
  trigger: 'blur',
}
ValidService.checkScript = {
  pattern: /^[\u00BF-\u1FFF\u2C00-\uD7FF\w\_\s]*$/g,
  message: LanguageService.lang.valid_script,
  trigger: 'blur',
}
ValidService.checkLink = {
  pattern:
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
  message: LanguageService.lang.valid_link,
  trigger: 'blur',
}
ValidService.checkTextFirst = {
  pattern: /^[a-zA-Z].*/g,
  message: LanguageService.lang.valid_textFirst,
  trigger: 'blur',
}
ValidService.checkDateTime = {
  pattern:
    /^([1-9]|([012][0-9])|(3[01]))[/]([0]{0,1}[1-9]|1[012])[/]\d\d\d\d [012]{0,1}[0-9]:[0-6][0-9]$/g,
  message: LanguageService.lang.valid_dateTime,
  trigger: 'blur',
}
ValidService.checkDate = {
  pattern:
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/g,
  message: LanguageService.lang.valid_date,
  trigger: 'blur',
}
ValidService.checkYear = {
  pattern: /^\d{4}$/g,
  message: LanguageService.lang.valid_year,
  trigger: 'blur',
}
ValidService.checkMonth = {
  pattern: /^\d{2}[/]\d{4}$/g,
  message: LanguageService.lang.valid_month,
  trigger: 'blur',
}
ValidService.checkDateTimeRange = {
  pattern: /^\d{1,2}:\d{2}\s?-\s?\d{1,2}:\d{2}$/,
  message: 'Sai định dạng giờ (hh:mm - hh:mm)',
  trigger: 'blur',
}

ValidService.checkLength = (start, end) => {
  var mess = ''
  var pattern = ''

  if (start && end) {
    mess = `${LanguageService.lang.valid_insert} ${start} ${LanguageService.lang.valid_to} ${end} ${LanguageService.lang.valid_character}`
    pattern = `.{${start},${end}}$`
  } else if (start) {
    mess = `${LanguageService.lang.valid_insertThan} ${start} ${LanguageService.lang.valid_character}`
    pattern = `.{${start},}$`
  } else if (end) {
    mess = `${LanguageService.lang.valid_insertLess} ${end} ${LanguageService.lang.valid_character}`
    pattern = `.{,${end}}$`
  }
  return {
    pattern: new RegExp(pattern),
    message: mess,
    trigger: 'blur',
  }
}
;(ValidService.checkVietNameseNoNumber = {
  // pattern: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/g,
  pattern: /^[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0123456789]+$/g,
  message: 'Không nhập ký tự đặc biệt, số',
  trigger: 'blur',
}),
  (ValidService.checkVietNameseHaveNumber = {
    // pattern: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/g,
    pattern: /^[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/g,
    message: 'Không nhập ký tự đặc biệt',
    trigger: 'blur',
  }),
  (ValidService.checkLength1 = (min, max) => {
    return {
      min: min,
      max: max,
      message: `${LanguageService.lang.valid_insert} ${min} ${LanguageService.lang.valid_to} ${max} ${LanguageService.lang.valid_character}`,
      trigger: 'blur',
    }
  })
ValidService.checkMaxLength = (max) => {
  return {
    max: max,
    message: `Nhập tối đa ${max} ký tự`,
    trigger: 'blur',
  }
}
ValidService.checkMinLength = (min) => {
  return {
    min: min,
    message: `Nhập tối thiểu ${min} ký tự`,
    trigger: 'blur',
  }
}
ValidService.pattern = (
  pattern,
  message = 'Giá trị không hợp lệ!',
  trigger = 'blur',
) => {
  return {
    pattern: typeof pattern === 'string' ? new RegExp(pattern) : pattern,
    message: message,
    trigger: trigger,
  }
}

export default ValidService
