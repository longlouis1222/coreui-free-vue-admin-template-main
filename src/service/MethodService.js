// import ExtensionService from "./ExtensionService";
import * as moment from "moment";
// import readXlsxFile from "read-excel-file";
// import Excel from "exceljs";
// import FileSaver from "file-saver";
// import { blockUi, unblockUi } from "../shared/utils";
// import { store } from '../store/store';

let MethodService = {};

MethodService.formatCurrency = (value) => {
  if (MethodService.isNumber(value)) {
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
  } else {
    return value
  }
}

MethodService.getRandomColor = function () {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

// roles: ["AdminSystem","Customer"]
MethodService.checkRole = function (stringRoles) {
  var currentUser = store.state.currentUser;
  let roles = stringRoles.split(",");
  var flag = false;
  roles.forEach(function (item) {
    item = item.trim();
    if (currentUser.roles.indexOf(item) != -1) {
      flag = true;
    }
  });
  return flag;
};

MethodService.getValidJobInfo = (jobInfor) => {
  let curentTime = new Date().getTime()
  return jobInfor.filter((e) => {
    if (e.end_date) {
      return (
        new Date(e.start_date).getTime() <= curentTime &&
        curentTime <= new Date(e.end_date).getTime()
      );
    } else {
      return new Date(e.start_date).getTime() <= curentTime;
    }
  })
}
MethodService.getValidShiftInfo = (shifts) => {
  let curentTime = new Date().getTime()
  return shifts.filter((e) => {
    if (e.end_time) {
      return (
        new Date(e.start_time).getTime() <= curentTime &&
        curentTime <= new Date(e.end_time).getTime()
      );
    } else {
      return new Date(e.start_time).getTime() <= curentTime;
    }
  })
}

MethodService.getExpriedJobInfo = (jobInfor) => {
  let curentTime = new Date().getTime();
  return jobInfor.filter((e) => {
    if (!e.end_date) return false
    return (
      new Date(e.start_date).getTime() < curentTime &&
      new Date(e.end_date).getTime() < curentTime
    )
  })
}

MethodService.getLongTermJobInfo = (jobInfor) => {
  let curentTime = new Date().getTime()
  let currentTimeAdd30 = new Date(moment(new Date()).add(30, 'days').toDate()).getTime()
  return jobInfor.filter((e) => {
    if (new Date(e.start_date).getTime() <= curentTime && !e.end_date) return true
    if (
      new Date(e.start_date).getTime() <= curentTime &&
      new Date(e.end_date).getTime() > currentTimeAdd30
    ) {
      return true
    } else {
      return false
    }
  })
}

MethodService.getWeeksInMonth = function (month, year) {
  var firstOfMonth = new Date(year, month, 1);
  var lastOfMonth = new Date(year, month + 1, 0);
  var used = firstOfMonth.getDay() + lastOfMonth.getDate();
  return Math.ceil(used / 7);
}

MethodService.calculatorSeniority = (startWorkingDate) => {
  if (!startWorkingDate) return 0
  let startWorkingDateMoment = moment(startWorkingDate)
  let now = moment()
  return now.diff(startWorkingDateMoment, "years") < 0 ? 0 : now.diff(startWorkingDateMoment, "years")
}

MethodService.checkHaveFeature = function (featureCode) {
  let listFeature = store.state.listFeature;
  let result = listFeature.find(item => item == featureCode);
  return result ? true : false;
};

MethodService.checkHavePermission = function (permissionCode) {
  if (!MethodService.checkHaveFeature(permissionCode)) {
    toastr.options.timeOut = 10000;
    toastr.warning("Bạn không có quyền truy cập chức năng này");
    setTimeout(() => {
      toastr.options.timeOut = 3500;
    }, 500)
  }
}

MethodService.moveObjectInArray = (arr, old_index, new_index) => {
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};
MethodService.sortByName = (data, field) => {
  return data.sort((a, b) => {
    let nameA = _.get(a, `${field}`).toUpperCase();
    let nameB = _.get(b, `${field}`).toUpperCase();
    return nameA.localeCompare(nameB);
  });
}

MethodService.getAge = (birthday) => {
  if (!birthday) return 0;
  let ageDifMs = Date.now() - new Date(birthday).getTime();
  let ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970) + 1;
}
// MethodService.checkWidthHeightImage = async (fileId, maxWidth, maxHeight) => {
//   if (!fileId) return false
//   const img = new Image();
//   img.src = ExtensionService.urlImg + fileId;
//   const result = await new Promise((resolve, reject) => {
//     img.onload = () => {
//       if ((img.width > maxWidth) && (img.height > maxHeight)) {
//         resolve({
//           file_id: fileId,
//           status: false,
//           message: "Kích thước ảnh không được vượt quá " + maxWidth + "x" + maxWidth + "px"
//         });
//       } else if (img.width > maxWidth) {
//         resolve({
//           file_id: fileId,
//           status: false,
//           message: "Chiều dài ảnh không được vượt quá " + maxWidth + "px"
//         });
//       } else if (img.height > maxHeight) {
//         resolve({
//           file_id: fileId,
//           status: false,
//           message: "Chiều rộng ảnh không được vượt quá " + maxHeight + "px"
//         });
//       } else {
//         resolve({
//           file_id: fileId,
//           status: true,
//           message: ""
//         });
//       }
//     };
//     img.onerror = (err) => {
//       reject(err);
//     }
//   });
//   return result;
// }
MethodService.totalWorkDayInMonth = (totalWeek, totalDayWork) => {

}
// MethodService.getWidthHeightImage = async (fileId) => {
//   if (!fileId) return null
//   const img = new Image()
//   img.src = ExtensionService.urlImg + fileId;
//   const result = await new Promise((resolve, reject) => {
//     img.onload = () => {
//       resolve({
//         width: img.width,
//         height: img.height
//       });
//     };
//     img.onerror = (err) => {
//       reject(err);
//     }
//   });
//   return result;

// };

MethodService.getCurrentDate = function () {
  return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59).toISOString()
};

MethodService.getFirstDayOfMonth = function (time) {
  let date = new Date(time), y = date.getFullYear(), m = date.getMonth()
  return new Date(y, m, 1)
}

MethodService.getLastDayOfMonth = function (time) {
  let date = new Date(time), y = date.getFullYear(), m = date.getMonth()
  return new Date(y, m + 1, 0, 23, 59, 59)
}

MethodService.trimSpace = function (value) {
  return value.trim();
};
MethodService.getCurrentUser = function () {
  return store.state.currentUser;
};
MethodService.getCompanyInfo = function () {
  return store.state.companyInfo;
};

MethodService.getListFeatures = function () {
  return store.state.listFeature;
};

MethodService.getListEmployeeRoleIds = function () {
  return store.state.listEmployeeRoleIds;
};

MethodService.getListEmployeeRoles = function () {
  return store.state.listEmployeeRoles;
};

MethodService.getUserProfile = function () {
  return store.state.userProfile;
};

MethodService.getEmployeeInfo = function () {
  return store.state.employeeInfo;
};

MethodService.getNavSubMenus = function () {
  return store.state.navSub
};

//Encode HTML
MethodService.encodeHTML = function (str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

//Decode HTML
MethodService.decodeHTML = function (str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

//Merge field in Contract template
MethodService.mergeField = function (template, objMergeFileds) {
  let result = template;
  for (let key in objMergeFileds) {
    result = result.replaceAll(`${key}`, objMergeFileds[key] ? objMergeFileds[key] : ".....................");
  }
  return result;
}

//required iso 9001 ex: yyyy-dd-mmThh:mm:ssZ
let formatDateMonth = "MM/YYYY";
let formatDateMoment = "DD/MM/YYYY";
let formatDateMoment2 = "YYYY/MM/DD";
let formatDateMomentMDY = "MM/DD/YYYY";


//ex: iso date to string date  yyyy-dd-mmThh:mm:ssZ - > DD/MM/YYYY
//ex: new Date to iso date  Wed Mar 25 2015 07:00:00 GMT+0700 (Giờ Đông Dương) - > yyyy-dd-mmThh:mm:ssZ || MethodService.formatDate(new Date, "")

MethodService.formatDateNoSignal = function (value) {
  let time = value.split(" ");
  let datearray = time[0].split("/");
  let timeArray = time[1].split(":");
  return datearray[0] + datearray[1] + datearray[2] + timeArray[0] + timeArray[1];
};

MethodService.formatterYYYYMMDD = function (value) {
  let datearray = value.split("/");
  return datearray[2] + "/" + datearray[1] + "/" + datearray[0];
};

MethodService.formatterMMDDYYYY = function (value) {
  let datearray = value.split("/");
  return datearray[1] + "/" + datearray[0] + "/" + datearray[2];
};

MethodService.formatterYYYYmmDD = function (value) {
  let datearray = value.split("/");
  return datearray[2] + "-" + datearray[1] + "-" + datearray[0];
};

MethodService.formatDateYYYYMMDD = function (value, rule) {
  if (value) {
    var format = "";
    if (rule == "date") {
      format = formatDateMoment2;
    } else if (rule == "datetime") {
      format = formatDateMoment2 + " HH:mm";
    } else if (rule == "aboutTime") {
      format = formatDateMoment2 + " HH:mm";
    } else if (rule == "month") {
      format = formatDateMonth;
    } else {
      format = rule;
    }
    return moment(value).format(format);
  } else {
    return "";
  }
};
MethodService.minus7hour = (value) => {
  let date = new Date(value);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() - 7, date.getMinutes(), date.getMilliseconds());

};

MethodService.formatDateToMilliseconds = function (date) {
  let m = new Date(date);
  let dateString =
    ("0" + m.getDate()).slice(-2) + "/" +
    ("0" + (m.getMonth() + 1)).slice(-2) + "/" +
    m.getFullYear() + " " +
    ("0" + m.getHours()).slice(-2) + ":" +
    ("0" + m.getMinutes()).slice(-2) + ":" +
    ("0" + m.getSeconds()).slice(-2) + "." +
    m.getMilliseconds();
  return dateString;
};

MethodService.formatDateToSeconds = function (date) {
  let m = new Date(date);
  let dateString =
    ("0" + m.getDate()).slice(-2) + "/" +
    ("0" + (m.getMonth() + 1)).slice(-2) + "/" +
    m.getFullYear() + " " +
    ("0" + m.getHours()).slice(-2) + ":" +
    ("0" + m.getMinutes()).slice(-2) + ":" +
    ("0" + m.getSeconds()).slice(-2);
  return dateString;
};

MethodService.formatDate = function (value, rule) {
  if (value) {
    var format = "";
    if (rule == "date") {
      format = formatDateMoment;
    } else if (rule == "datetime") {
      format = formatDateMoment + " HH:mm";
    } else if (rule == "timedate") {
      format = "HH:mm " + formatDateMoment;
    } else if (rule == "aboutTime") {
      format = formatDateMoment + " HH:mm";
    } else if (rule == "month") {
      format = formatDateMonth;
    } else {
      format = rule;
    }
    return moment(new Date(value)).format(format);
  } else {
    return "";
  }
};

MethodService.formatDateUTC = function (value, rule) {
  if (value) {
    var format = "";
    if (rule == "date") {
      format = formatDateMoment;
    } else if (rule == "datetime") {
      format = formatDateMoment + " HH:mm";
    } else if (rule == "aboutTime") {
      format = formatDateMoment + " HH:mm";
    } else if (rule == "month") {
      format = formatDateMonth;
    } else {
      format = rule;
    }
    return moment(new Date(value))
      .utc()
      .format(format);
  } else {
    return "";
  }
};

MethodService.formatTimestamp = function (value, rule) {
  if (value) {
    var format = "";
    if (rule == "date") {
      format = formatDateMoment;
    } else if (rule == "datetime") {
      format = formatDateMoment + " HH:mm";
    } else if (rule == "aboutTime") {
      format = formatDateMoment + " HH:mm";
    } else {
      format = rule;
    }
    return moment(value, "YYYY:MM:DDTHH:mm:ss.SSSZZ").format(format);
  } else {
    return "";
  }
};

MethodService.getAboutTime = function (value) {
  if (value) {
    let timeAgo = moment(value).fromNow();
    timeAgo = timeAgo
      .replace("a few seconds ago", "vài giây trước")
      .replace("minutes ago", "phút trước")
      .replace("hours ago", "giờ trước");
    return timeAgo;
  } else {
    return "";
  }
};

MethodService.addDate = function (value, type, numberTime) {
  if (!value) {
    return "";
  }
  return moment(value)
    .add(numberTime, type)
    .format("YYYY-MM-DDTHH:mm:ss");
};

MethodService.formatterTrimString = function (
  row,
  column,
  cellValue,
  index,
  number
) {
  if (!number) {
    number = 8;
  }
  var lengthAllow = (column.width ? column.width : column.realWidth) / number;
  if (cellValue) {
    if (cellValue.length > lengthAllow) {
      return cellValue.slice(0, lengthAllow) + "...";
    } else {
      return cellValue;
    }
  } else {
    return "";
  }
};

MethodService.formatterFloatNumber = function (row, column, cellValue, index) {
  if (cellValue) {
    cellValue = parseFloat(cellValue).toFixed(2);
    return cellValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
};

MethodService.stringToObject = function (value) {
  var obj = {};
  if (!value) return obj;

  value.split("&").forEach(frm => {
    var m = decodeURIComponent(frm).match(
      /^(\w+(\.\w+)*)(=|>=|<=|<>|!=|:\w+:)(.*)/
    );
    if (!m) return;
    if (m[1] in obj) return;
    if (m[3].match(/:regex(_\w+)?:/)) obj[m[1]] = unescapeRegex(m[4]);
    else obj[m[1]] = m[4];
  });

  return obj;
};

MethodService.CalculationYear = function (type, last, next) {
  var toGo = "";
  var yearNow = new Date();
  var limit = yearNow.getFullYear();
  if (type == "last") {
    toGo = last;
  }
  if (type == "next") {
    toGo = next;
    limit = limit + next - 1;
  }
  if (type == "last-next") {
    toGo = next + last;
    limit = limit + next - 1;
  }
  var arr = [];
  for (let i = 0; i < toGo; i++) {
    arr.push(limit - i);
  }
  return arr;
};

MethodService.beforeAvatarUpload = function (file, mb) {
  return file.size / 1024 / 1024 < mb;
};

MethodService.EndYearBind = function (startYear) {
  let arr = [];
  let setYear = new Date();
  let yearPresent = setYear.getFullYear();

  if (startYear) {
    let rangToYearStart = yearPresent - startYear;
    if (rangToYearStart <= 20) {
      for (let i = rangToYearStart; i >= 1; i--) {
        arr.push(startYear + i);
      }
    } else {
      for (let i = 20; i <= 1; i) {
        arr.push(startYear + i);
      }
    }
  } else {
    for (let i = 0; i < 20; i++) {
      arr.push(yearPresent - i);
    }
  }

  return arr;
};

MethodService.StartYearBind = function (endYear) {
  let arr = [];
  let setYear = new Date();
  let yearPresent = setYear.getFullYear();
  if (endYear) {
    let rangToYearStart = endYear - Number(2000);
    if (rangToYearStart <= 20)
      for (let i = 1; i < rangToYearStart; i++) {
        arr.push(endYear - i);
      }
  } else {
    for (let i = 1; i < 20; i++) {
      arr.push(yearPresent - i);
    }
  }
  return arr;
};

MethodService.stopLadda = function () {
  setTimeout(function () {
    window.Ladda.stopAll();
  }, 100);
};

MethodService.checkFileSize = function (file, mb) {
  return file.size / 1024 / 1024 < mb;
};

MethodService.checkFileType = function (type) {
  let typeFile = ["mp4", "jpg", "png", "jpeg", "mp4", "avi", "mov"];
  if (typeFile.includes(type)) {
    return true;
  } else {
    return false;
  }
};

MethodService.isString = function (value) {
  return typeof value === "string" || value instanceof String;
};

MethodService.isNumber = function (value) {
  return typeof value === "number" && isFinite(value);
};

MethodService.isArray = function (value) {
  return value && typeof value === "object" && value.constructor === Array;
};

MethodService.isFunction = function (value) {
  return typeof value === "function";
};

MethodService.isObject = function (value) {
  return value && typeof value === "object" && value.constructor === Object;
};

MethodService.isDate = function (value) {
  return value instanceof Date;
};

MethodService.isBoolean = function (value) {
  return typeof value === "boolean";
};

MethodService.isNull = function (value) {
  return value === null;
};

MethodService.isUndefined = function (value) {
  return typeof value === "undefined";
};

MethodService.checkIsDate = function (day, month, year) {
  var d = parseInt(day);
  var m = parseInt(month);
  var y = parseInt(year);

  var date = new Date(y, m - 1, d);
  if (
    date.getFullYear() == y &&
    date.getMonth() + 1 == m &&
    date.getDate() == d
  ) {
    return true;
  }
  return false;
};

MethodService.copyObject = function (value) {
  return JSON.parse(JSON.stringify(value));
};

MethodService.findDuplicates = (arr) => {
  let sorted_arr = arr.slice().sort(); // You can define the comparing function here.
  // JS by default uses a crappy string compare.
  // (we use slice to clone the array so the
  // original array won't be modified)
  let results = [];
  for (let i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] == sorted_arr[i]) {
      results.push(sorted_arr[i]);
    }
  }
  return results;
}

// so sánh 2 object khởi tạo và object trả về, nếu trả về thiếu trường thì lấy trường từ object khởi tạo gán vào objetc trả về
MethodService.checkDifferentObject = function (objectOld, objectNew) {
  function forObject(objectOld) {
    $.each(objectOld, function (key_objectOld, value_objectOld) {
      if (MethodService.isUndefined(objectNew[key_objectOld])) {
        objectNew[key_objectOld] = objectOld[key_objectOld];
      } else if (MethodService.isNull(objectNew[key_objectOld])) {
        objectNew[key_objectOld] = objectOld[key_objectOld];
      } else {
        if (MethodService.isObject(value_objectOld)) {
          forObject(value_objectOld);
        }
      }
    });
  }
  forObject(objectOld);
  return objectNew;
};

// Tìm các phần tử khác nhau có trong mảng object trả về [],
// nếu truyền [object] thì truyển thêm field
// nếu truyền array thì k cần
MethodService.findListItemDifferent = function (arrItem, field) {
  let arrItemNew = [];
  if (field) {
    $.each(arrItem, (index, item) => {
      if (field) {
        if (item[field]) {
          if (arrItemNew.indexOf(item[field]) == -1) {
            arrItemNew.push(item[field]);
          }
        }
      } else {
        if (arrItemNew.indexOf(item) == -1) {
          arrItemNew.push(item);
        }
      }
    });
    return arrItemNew;
  } else {
    return arrItem.filter((item, index) => {
      return arrItem.indexOf(item) === index;
    });
  }
};

MethodService.findListItemDuplicate = function (arrItem1, arrItem2) {
  return arrItem1.filter(function (val) {
    return arrItem2.indexOf(val) != -1;
  });
};

MethodService.replaceURLImage = function (value) {
  return value.replace(
    /(!\[[^\]]*\])\([\w.\-\/:]+file\/thumb\?id=([0-9a-fA-F]{24})\)/g,
    "$1($2)"
  );
};

// MethodService.unreplaceURLImage = function (value) {
//   return value.replace(
//     /!\[([^\]]*)\]\(([0-9a-fA-F]{24})\)/g,
//     `![$1](${ExtensionService.urlImg}$2)`
//   );
// };

MethodService.checkSDT = function (value) {
  return RegExp(/^(0|\+?84|0084)\d{9}$/).test(value);
};

MethodService.mathRound = (value) => {
  return Math.round(value * 100) / 100;
};

MethodService.toIsoDate = function (value) {
  return moment(value).format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
};

function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

function unescapeRegex(string) {
  return string.replace(/\\([-\/\\^$*+?.()|[\]{}])/g, "$1");
}

MethodService.filterTable = function (jsonFilter) {
  if (jsonFilter) {
    let dataSearch = JSON.parse(jsonFilter);
    console.log("dataSearch", dataSearch);
    let filters = "";
    $.each(dataSearch.value, (key, value) => {
      console.log("value", value);
      if (value) {
        if (dataSearch.operator) {
          if (dataSearch.operator[key]) {
            let operator = dataSearch.operator[key];
            if (operator == "<+1day") {
              filters +=
                key +
                "<" +
                encodeURIComponent(
                  encodeURIComponent(MethodService.addDate(value, "days", 1))
                ) +
                "&";
            } else if (operator == "$vn_text=") {
              filters += operator + encodeURIComponent(value) + "&";
            } else if (operator == ":in_that_day:") {
              filters +=
                key +
                ">=" +
                encodeURIComponent(MethodService.toIsoDate(value)) +
                "&" +
                key +
                "<" +
                encodeURIComponent(
                  MethodService.toIsoDate(MethodService.addDate(value, "days", 1))
                ) +
                "&";
            } else if (operator.match(/^:regex(_\w+)?:$/)) {
              filters +=
                key + operator + encodeURIComponent(escapeRegex(value)) + "&";
            } else if (operator == ":in:") {
              filters += key + operator + encodeURIComponent(value) + "&";
            } else if (operator == "fromTime") {
              filters +=
                key +
                ">=" +
                encodeURIComponent(MethodService.toIsoDate(value)) +
                "&";
            } else if (operator == "toTime") {
              filters +=
                key +
                "<=" +
                encodeURIComponent(MethodService.toIsoDate(value)) +
                "&";
            } else {
              filters += key + operator + encodeURIComponent(value) + "&";
            }
          } else {
            filters += key + "=" + encodeURIComponent(value) + "&";
          }
        } else {
          filters += key + "=" + encodeURIComponent(value) + "&";
        }
      }
    });
    return filters.slice(0, -1);
  } else {
    return "";
  }
};

MethodService.changeAlias = function (alias) {
  var str = alias.toLowerCase();
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  str = str.replace(/ + /g, " ");
  str = str.trim();
  return str;
};

MethodService.formatCurrency = value => {
  if (MethodService.isNumber(value)) {
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  } else {
    return value;
  }
};

MethodService.styleRowExcel = (worksheet) => {
  worksheet.getRow(1).height = 30;
  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    row.eachCell(function (cell, colNumber) {
      if (rowNumber == 1) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFE162" }
        };
        cell.font = { bold: true };
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true
        };
      } else {
        cell.alignment = {
          vertical: "middle",
          wrapText: true
        };
      }
      // Set border of each cell
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
    });
  });
  return worksheet;
}
MethodService.styleRowAnotherExcel = (worksheet) => {
  worksheet.getRow(5).height = 31;
  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    row.eachCell(function (cell, colNumber) {
      if (rowNumber == 5) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFE162" }
        };
        cell.font = { bold: true };
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true
        };
      } else {
        cell.alignment = {
          vertical: "middle",
          wrapText: true
        };
        if (rowNumber > 5 && (colNumber === 1 || colNumber === 3 || colNumber === 4)) {
          cell.alignment.horizontal = "center"
        }
      }
      // Set border of each cell
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
    });
  });
  return worksheet;
}

MethodService.exportExcel = async (dataList) => {
  let workbook = MethodService.createWookbook();
  let worksheet = workbook.addWorksheet("Thông tin hành chính", {
    views: [{ state: "frozen", xSplit: 3, ySplit: 1 }]
  });

  worksheet.columns = [
    { header: "Mã nhân viên", key: "employee_no", width: 23 },
    { header: "Họ và tên đệm", key: "last_name", width: 20 },
    { header: "Tên", key: "first_name", width: 20 },
    { header: "Ngày sinh", key: "birthday", width: 13 },
    { header: "Giới tính", key: "gender", width: 12 },
    { header: "Số điện thoại", key: "phone_number", width: 18 },
    { header: "Email cá nhân", key: "email", width: 30 },
    { header: "Email công ty", key: "company_email", width: 30 },
    { header: "Số CMND/CCCD", key: "identify_card", width: 15 },
    { header: "Địa chỉ", key: "address", width: 70 },
    // { header: "Mạng xã hội", key: "social_network_name", width: 40 },
  ];

  window.$.each(dataList, (index, element) => {
    let item = {};
    item.employee_no = element.employee_no;
    item.last_name = element.last_name;
    item.first_name = element.first_name;
    item.birthday = element.birthday ? new Date(element.birthday) : "";
    item.gender = element.gender;
    item.phone_number = element.phone_number ? element.phone_number : "";
    item.email = element.email;
    item.company_email = element.company_email ? element.company_email : "";
    item.identify_card = element.administrative_info.identify_card ? element.administrative_info.identify_card : "";
    item.address = element.administrative_info.address ? element.administrative_info.address : "";
    // item.social_network_name = element.social_network_name;
    worksheet.addRow(item);
  });


  let sheetShift = workbook.addWorksheet("Thông tin chấm công", {
    views: [{ state: "frozen", xSplit: 3, ySplit: 1 }]
  });

  sheetShift.columns = [
    { header: "Mã nhân viên", key: "employee_no", width: 23 },
    { header: "Họ và tên đệm", key: "last_name", width: 20 },
    { header: "Tên", key: "first_name", width: 20 },
    { header: "Ca làm việc", key: "shift_name", width: 40 },
    { header: "Ngày bắt đầu", key: "start_time", width: 20 },
    { header: "Ngày kết thúc", key: "end_time", width: 20 },
  ];

  window.$.each(dataList, (index, element) => {
    let item = {};
    item.employee_no = element.employee_no;
    item.last_name = element.last_name;
    item.first_name = element.first_name;
    item.shift_name = element.shift_name;
    item.start_time = element.start_time;
    item.end_time = element.end_time;
    sheetShift.addRow(item);
  });

  let sheetJob = workbook.addWorksheet("Thông tin công việc", {
    views: [{ state: "frozen", xSplit: 3, ySplit: 1 }]
  });

  sheetJob.columns = [
    { header: "Mã nhân viên", key: "employee_no", width: 23 },
    { header: "Họ và tên đệm", key: "last_name", width: 20 },
    { header: "Tên", key: "first_name", width: 20 },
    { header: "Hợp đồng", key: "contract_name", width: 30 },
    { header: "Chức vụ", key: "position_name", width: 30 },
    { header: "Phòng ban", key: "department_name", width: 30 },
    { header: "Chi nhánh", key: "branch_name", width: 30 },
    { header: "Ngày bắt đầu", key: "start_date", width: 20 },
    { header: "Ngày kết thúc", key: "end_date", width: 20 },
  ];

  window.$.each(dataList, (index, element) => {
    let item = {};
    item.employee_no = element.employee_no;
    item.last_name = element.last_name;
    item.first_name = element.first_name;
    item.contract_name = element.contract_name;
    item.position_name = element.position_name;
    item.department_name = element.department_name;
    item.branch_name = element.branch_name;
    item.start_date = element.start_date;
    item.end_date = element.end_date;
    sheetJob.addRow(item);
  });

  let sheetQualification = workbook.addWorksheet("Trình độ chuyên môn", {
    views: [{ state: "frozen", xSplit: 3, ySplit: 1 }]
  });

  sheetQualification.columns = [
    { header: "Mã nhân viên", key: "employee_no", width: 23 },
    { header: "Họ và tên đệm", key: "last_name", width: 20 },
    { header: "Tên", key: "first_name", width: 20 },
    { header: "Trình độ", key: "qualification_name", width: 30 },
    { header: "Chuyên ngành", key: "major_name", width: 30 },
    { header: "Ngày cấp", key: "qualification_issued_date", width: 20 },
    { header: "Nơi cấp", key: "qualification_issued_by", width: 30 },
    { header: "Ghi chú", key: "qualification_note", width: 30 },
  ];

  window.$.each(dataList, (index, element) => {
    let item = {};
    item.employee_no = element.employee_no;
    item.last_name = element.last_name;
    item.first_name = element.first_name;
    item.qualification_name = element.qualification_name;
    item.major_name = element.major_name;
    item.qualification_issued_date = element.qualification_issued_date;
    item.qualification_issued_by = element.qualification_issued_by;
    item.qualification_note = element.qualification_note;
    sheetQualification.addRow(item);
  });

  let sheetCertificate = workbook.addWorksheet("Chứng chỉ", {
    views: [{ state: "frozen", xSplit: 3, ySplit: 1 }]
  });

  sheetCertificate.columns = [
    { header: "Mã nhân viên", key: "employee_no", width: 23 },
    { header: "Họ và tên đệm", key: "last_name", width: 20 },
    { header: "Tên", key: "first_name", width: 20 },
    { header: "Tên chứng chỉ", key: "certificate_name", width: 30 },
    { header: "Ngày cấp", key: "certificate_issued_date", width: 20 },
    { header: "Nơi cấp", key: "certificate_issued_by", width: 30 },
    { header: "Ghi chú", key: "certificate_note", width: 30 }
  ];

  window.$.each(dataList, (index, element) => {
    let item = {};
    item.employee_no = element.employee_no;
    item.last_name = element.last_name;
    item.first_name = element.first_name;
    item.certificate_name = element.certificate_name;
    item.certificate_issued_date = element.certificate_issued_date;
    item.certificate_issued_by = element.certificate_issued_by;
    item.certificate_note = element.certificate_note;
    sheetCertificate.addRow(item);
  });

  let sheetOtherContactInfo = workbook.addWorksheet("Thông tin liên hệ khác", {
    views: [{ state: "frozen", xSplit: 3, ySplit: 1 }]
  });

  sheetOtherContactInfo.columns = [
    { header: "Mã nhân viên", key: "employee_no", width: 23 },
    { header: "Họ và tên đệm", key: "last_name", width: 20 },
    { header: "Tên", key: "first_name", width: 20 },
    { header: "Họ và tên", key: "other_contact_info_name", width: 30 },
    { header: "Quan hệ", key: "other_contact_info_relationship", width: 30 },
    { header: "Điện thoại", key: "other_contact_info_phone", width: 30 },
    { header: "Địa chỉ", key: "other_contact_info_address", width: 30 }
  ];

  window.$.each(dataList, (index, element) => {
    let item = {};
    item.employee_no = element.employee_no;
    item.last_name = element.last_name;
    item.first_name = element.first_name;
    item.other_contact_info_name = element.other_contact_info_name;
    item.other_contact_info_relationship = element.other_contact_info_relationship;
    item.other_contact_info_phone = element.other_contact_info_phone;
    item.other_contact_info_address = element.other_contact_info_address;
    sheetOtherContactInfo.addRow(item);
  });

  let sheetSalary = workbook.addWorksheet("Lương Trợ cấp", {
    views: [{ state: "frozen", xSplit: 3, ySplit: 1 }]
  });

  sheetSalary.columns = [
    { header: "Mã nhân viên", key: "employee_no", width: 23 },
    { header: "Họ và tên đệm", key: "last_name", width: 20 },
    { header: "Tên", key: "first_name", width: 20 },
    { header: "Hình thức chi trả", key: "payment_method", width: 28 },
    { header: "Số tài khoản", key: "bank_account", width: 25 },
    { header: "Ngân hàng", key: "bank_name", width: 30 },
    { header: "Chi nhánh", key: "bank_branch", width: 30 },
    { header: "Bậc lương", key: "rank_salary", width: 30 },
    { header: "Hệ số lương", key: "coefficient_salary", width: 30 },
    { header: "Lương Gross", key: "gross_salary", width: 25 },
    { header: "Đóng bảo hiểm", key: "insurance_salary", width: 25 },
    { header: "Trợ cấp", key: "subsidies_salary_name", width: 35 },
  ];

  window.$.each(dataList, (index, element) => {
    let item = {};
    item.employee_no = element.employee_no;
    item.last_name = element.last_name;
    item.first_name = element.first_name;
    item.payment_method = element.payment_method;
    item.bank_account = element.bank_account;
    item.bank_name = element.bank_name;
    item.bank_branch = element.bank_branch;
    item.rank_salary = element.rank_salary;
    item.coefficient_salary = element.coefficient_salary;
    item.gross_salary = element.gross_salary;
    item.insurance_salary = element.insurance_salary;
    item.subsidies_salary_name = element.subsidies_salary_name;
    sheetSalary.addRow(item);
  });

  let sheetDependentPerson = workbook.addWorksheet("Thông tin người phụ thuộc", {
    views: [{ state: "frozen", xSplit: 3, ySplit: 1 }]
  });

  sheetDependentPerson.columns = [
    { header: "Mã nhân viên", key: "employee_no", width: 23 },
    { header: "Họ và tên đệm", key: "last_name", width: 20 },
    { header: "Tên", key: "first_name", width: 20 },
    { header: "Họ và tên", key: "dependent_person_name", width: 30 },
    { header: "Quan hệ", key: "dependent_person_relationship", width: 25 },
    { header: "Ngày đăng ký", key: "dependent_person_registered_date", width: 20 },
    { header: "Ngày hết hạn", key: "dependent_person_expired_date", width: 20 }
  ];

  window.$.each(dataList, (index, element) => {
    let item = {};
    item.employee_no = element.employee_no;
    item.last_name = element.last_name;
    item.first_name = element.first_name;
    item.dependent_person_name = element.dependent_person_name;
    item.dependent_person_relationship = element.dependent_person_relationship;
    item.dependent_person_registered_date = element.dependent_person_registered_date;
    item.dependent_person_expired_date = element.dependent_person_expired_date;
    sheetDependentPerson.addRow(item);
  });

  MethodService.styleRowExcel(worksheet);
  MethodService.styleRowExcel(sheetShift);
  MethodService.styleRowExcel(sheetJob);
  MethodService.styleRowExcel(sheetQualification);
  MethodService.styleRowExcel(sheetCertificate);
  MethodService.styleRowExcel(sheetOtherContactInfo);
  MethodService.styleRowExcel(sheetSalary);
  MethodService.styleRowExcel(sheetDependentPerson);
  let nowDate = MethodService.formatDateNoSignal(
    MethodService.formatDate(new Date(), "datetime")
  );
  workbook.xlsx.writeBuffer().then(function (data) {
    var blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
    FileSaver.saveAs(blob, `DanhSachNhanVien_${nowDate}.xlsx`);
  });
};

MethodService.addAnotherSheetEmployee = (workbook, data, name, headers, keys) => {
  let sheet = workbook.addWorksheet(name, {
    views: [{ state: "frozen", xSplit: 3, ySplit: 1 }]
  });
  sheet.columns = [];
  headers.forEach((item, index) => {
    sheet.columns.push({
      header: item,
      key: keys[index]
    });
  })
  data.forEach((e, i) => {
    let item = {};
    keys.forEach(key => {
      item[key] = e[key] ? e[key] : "";
    })
    sheet.addRow(item);
  });

  MethodService.styleRowExcel(sheet);
  return sheet;

}
MethodService.readExcel = (dataFile) => {
  return new Promise(function (resolve, reject) {
    blockUi();
    readXlsxFile(dataFile, { dateFormat: 'dd/mm/yyyy hh:mm' }).then((rows) => {
      resolve(rows);
      unblockUi()
    }, (error) => {
      window.toastr.error("Đọc file thất bại");
      unblockUi();
      reject(error);
    });
  })
};
MethodService.createWookbook = () => {
  let workbook = new Excel.Workbook();
  workbook.created = new Date();
  workbook.calcProperties.fullCalcOnLoad = false;
  workbook.views = [{
    x: 0,
    y: 0,
    width: 10000,
    height: 20000,
    firstSheet: 0,
    activeTab: 0,
    visibility: "visible"
  }];
  return workbook
}

MethodService.addAnotherSheet = (workbook, data, name, headers) => {
  let sheet = workbook.addWorksheet(name, {
    views: [{ state: "frozen", ySplit: 1 }]
  });
  sheet.state = "hidden";

  sheet.columns = [
    { header: headers[0], key: "code", width: 20 },
    { header: headers[1], key: "name", width: 30 },
  ];
  $.each(data, (i, e) => {
    let item = {};
    item.code = e.code ? e.code : "";
    item.name = e.name ? e.name : "";
    sheet.addRow(item);
  });

  MethodService.styleRowExcel(sheet);

  return sheet
}
MethodService.exportTemplateImportEmployee = async function (listDataEm, listBranch, listDeparterment, listPosition, listHopDong, type) {
  let workbook = MethodService.createWookbook();
  let worksheetEmployee = workbook.addWorksheet("Nhan_Vien", {
    views: [{ state: "frozen", xSplit: 3, ySplit: 1 }]
  });
  worksheetEmployee.columns = [
    { header: "Mã nhân viên*", key: "employee_no", width: 20 },
    { header: "Họ và tên đệm *", key: "first_name", width: 25 },
    { header: "Tên *", key: "last_name", width: 20 },
    { header: "Giới tính *", key: "gender", width: 15 },
    { header: "Số điện thoại", key: "phone", width: 25 },
    { header: "Email *", key: "email", width: 30 },
    { header: "Tài khoản đăng nhập *", key: "account", width: 25 },
    { header: "Mã hợp đồng *", key: "contract_type_code", width: 20 },
    { header: "Hợp đồng", key: "contract_type", width: 25 },
    { header: "Mã chức vụ", key: "position_code", width: 20 },
    { header: "Chức vụ", key: "position", width: 20 },
    { header: "Mã phòng ban", key: "departerment_code", width: 20 },
    { header: "Phòng ban", key: "departerment", width: 20 },
    { header: "Mã chi nhánh", key: "branch_code", width: 20 },
    { header: "Chi nhánh", key: "branch", width: 20 },
    { header: "Ngày bắt đầu*", key: "time_start", width: 20 },
    { header: "Ngày kết thúc", key: "time_end", width: 20 },
    type && type == 'error' ? { header: "Thông báo lỗi", key: "message", width: 50 } : {}
  ];
  worksheetEmployee.getRow(1).height = 20;
  let row = worksheetEmployee.getRow(1);
  row.eachCell(function (cell, colNumber) {
    row.getCell(colNumber).font = { bold: true };
    row.getCell(colNumber).alignment = {
      vertical: "middle",
      horizontal: "center"
    };
  });
  if (!listDataEm || listDataEm.length == 0) {
    for (let i = 0; i < 2000; i++) {
      worksheetEmployee.addRow().commit();
    }
  } else if (listDataEm && listDataEm.length > 0) {
    $.each(listDataEm, (i, e) => {
      let item = {};
      item.employee_no = e.EmployeeNo ? e.EmployeeNo : "";
      item.first_name = e.FirstName ? e.FirstName : "";
      item.last_name = e.LastName ? e.LastName : "";
      item.gender = e.Gender ? e.Gender : "";
      item.phone = e.PhoneNumber ? e.PhoneNumber : "";
      item.email = e.Email ? e.Email : "";
      item.account = e.Account ? e.Account : "";
      item.contract_type_code = e.ContractTypeCode ? e.ContractTypeCode : "";
      item.contract_type = e.ContractTypeName ? e.ContractTypeName : "";
      item.position_code = e.PositionCode ? e.PositionCode : "";
      item.position = e.PositionName ? e.PositionName : "";
      item.departerment_code = e.DepartmentCode ? e.DepartmentCode : "";
      item.departerment = e.DepartmentName ? e.DepartmentName : "";
      item.branch_code = e.BranchCode ? e.BranchCode : "";
      item.branch = e.BranchName ? e.BranchName : "";
      item.time_start = e.StartDate ? MethodService.formatDate(e.StartDate, 'date') : "";
      item.time_end = e.EndDate ? MethodService.formatDate(e.EndDate, 'date') : "";
      item.message = e.messages ? e.messages : "";
      worksheetEmployee.addRow(item);
    });
  }
  worksheetEmployee.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    row.eachCell(function (cell, colNumber) {
      if (rowNumber == 1) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFE162" }
        };
        cell.font = { bold: true };
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true
        };
      } else {
        cell.alignment = {
          vertical: "middle",
          wrapText: true
        };
      }
      // Set border of each cell
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
    });
  });
  worksheetEmployee.getCell('A1').note = {
    texts: [
      {
        'font': {
          'bold': true, 'size': 11, 'color': { 'theme': 1 },
          'name': 'Calibri', 'family': 2, 'scheme': 'minor'
        },
        'text': `'Chỉ nhập từ A-Z, 0-9'`
      },
    ],
    margins: {
      insetmode: 'custom',
      inset: [0.2, 0.2, 0.2, 0.2]
    },
  };
  worksheetEmployee.getCell('G1').note = {
    texts: [
      {
        'font': {
          'bold': true, 'size': 11, 'color': { 'theme': 1 },
          'name': 'Calibri', 'family': 2, 'scheme': 'minor'
        },
        'text': "Nhập từ 4-12 ký tự"
      },
    ],
    margins: {
      insetmode: 'custom',
      inset: [0.2, 0.2, 0.2, 0.2]
    },
  };
  worksheetEmployee.getCell('P1').note = {
    texts: [
      {
        'font': {
          'bold': true, 'size': 11, 'color': { 'theme': 1 },
          'name': 'Calibri', 'family': 2, 'scheme': 'minor'
        },
        'text': "Định dạng ngày là DD/MM/YYYY"
      },
    ],
    margins: {
      insetmode: 'custom',
      inset: [0.2, 0.2, 0.2, 0.2]
    },
  };
  worksheetEmployee
    .getColumn("D")
    .eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      if (rowNumber != 1) {
        cell.dataValidation = {
          type: "list",
          allowBlank: true,
          formulae: ['"Nam,Nữ,Khác"']
        };
      }
    });
  worksheetEmployee
    .getColumn("H")
    .eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      if (rowNumber != 1) {
        cell.dataValidation = {
          type: "list",
          allowBlank: true,
          formulae: ["ContractType!$A$2:$A$2000"]
        };
      }
    });
  worksheetEmployee
    .getColumn("I")
    .eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      if (rowNumber != 1) {
        cell.value = { formula: `IF(H${rowNumber} = "", "", VLOOKUP(H${rowNumber},ContractType!$A$2:$B$2000,2,0))` }
      }
    });
  worksheetEmployee
    .getColumn("J")
    .eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      if (rowNumber != 1) {
        cell.dataValidation = {
          type: "list",
          allowBlank: true,
          formulae: ["Position!$A$2:$A$2000"]
        };
      }
    });
  worksheetEmployee
    .getColumn("K")
    .eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      if (rowNumber != 1) {
        cell.value = { formula: `IF(J${rowNumber} = "", "", VLOOKUP(J${rowNumber},Position!$A$2:$B$2000,2,0))` }
      }
    });
  worksheetEmployee
    .getColumn("L")
    .eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      if (rowNumber != 1) {
        cell.dataValidation = {
          type: "list",
          allowBlank: true,
          formulae: ["Departerment!$A$2:$A$2000"]
        };
      }
    });
  worksheetEmployee
    .getColumn("M")
    .eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      if (rowNumber != 1) {
        cell.value = { formula: `IF(L${rowNumber} = "", "", VLOOKUP(L${rowNumber},Departerment!$A$2:$B$2000,2,0))` }
      }
    });
  worksheetEmployee
    .getColumn("N")
    .eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      if (rowNumber != 1) {
        cell.dataValidation = {
          type: "list",
          allowBlank: true,
          formulae: ["Branch!$A$2:$A$2000"]
        };
      }
    });
  worksheetEmployee
    .getColumn("O")
    .eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      if (rowNumber != 1) {
        cell.value = { formula: `IF(N${rowNumber} = "", "", VLOOKUP(N${rowNumber},Branch!$A$2:$B$2000,2,0))` }
      }
    });
  worksheetEmployee
    .getColumn("P")
    .eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      if (rowNumber != 1) {
        cell.dataValidation = {
          type: 'date',
          operator: 'lessThan',
          showErrorMessage: true,
          allowBlank: false,
          formulae: [new Date(2200, 0, 1)]
        };
      }
    });
  worksheetEmployee
    .getColumn("Q")
    .eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      if (rowNumber != 1) {
        cell.dataValidation = {
          type: 'date',
          operator: 'lessThan',
          showErrorMessage: true,
          allowBlank: true,
          formulae: [new Date(2200, 0, 1)]
        };
      }
    });
  await this.addAnotherSheet(workbook, listHopDong, "ContractType", ["Mã hợp đồng", "Tên hợp đồng"]);
  await this.addAnotherSheet(workbook, listPosition, "Position", ["Mã chức vụ", "Tên chức vụ"]);
  await this.addAnotherSheet(workbook, listDeparterment, "Departerment", ["Mã phòng ban", "Tên phòng ban"]);
  await this.addAnotherSheet(workbook, listBranch, "Branch", ["Mã chi nhánh", "Tên chi nhánh"]);


  workbook.xlsx.writeBuffer().then(function (data) {
    var blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
    FileSaver.saveAs(blob, type == 'template' ? `Template_Import_Employee.xlsx` : "Error_Import_Employee.xlsx");
  });
}

MethodService.exportTemplateImportWork = async (listShift) => {
  let workbook = MethodService.createWookbook();
  let worksheetWork = workbook.addWorksheet("Import công", {
    // views: [{ state: "frozen", ySplit: 1 }]
  });
  worksheetWork.columns = [
    { header: "Mã nhân viên *", key: "first_name", width: 20 },
    { header: "Thời điểm từ *", key: "last_name", width: 25 },
    { header: "Thời điểm đến *", key: "gender", width: 25 },
    { header: "Mã ca *", key: "phone", width: 25 },
    { header: "Tên ca", key: "email", width: 38 },
    { header: "Lý do *", key: "account", width: 50 }
  ];
  worksheetWork.getRow(1).height = 20;
  for (let i = 0; i < 2000; i++) {
    worksheetWork.addRow().commit();
  }
  worksheetWork.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    row.eachCell(function (cell, colNumber) {
      if (rowNumber == 1) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFE162" }
        };
        cell.font = { bold: true };
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true
        };
      } else {
        cell.alignment = {
          vertical: "middle",
          wrapText: true
        };
      }
      // Set border of each cell
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
    });
  });
  worksheetWork.getCell('B1').note = {
    texts: [
      {
        'font': {
          'bold': true, 'size': 11, 'color': { 'theme': 1 },
          'name': 'Calibri', 'family': 2, 'scheme': 'minor'
        },
        'text': `Định dạng ngày là DD/MM/YYYY HH:mm`
      },
    ],
    margins: {
      insetmode: 'custom',
      inset: [0.2, 0.2, 0.2, 0.2]
    },
  };
  worksheetWork.getCell('C1').note = {
    texts: [
      {
        'font': {
          'bold': true, 'size': 11, 'color': { 'theme': 1 },
          'name': 'Calibri', 'family': 2, 'scheme': 'minor'
        },
        'text': `Định dạng ngày là DD/MM/YYYY HH:mm`
      },
    ],
    margins: {
      insetmode: 'custom',
      inset: [0.2, 0.2, 0.2, 0.2]
    },
  };
  await MethodService.addAnotherSheet(workbook, listShift, "Shift", ["Mã ca", "Tên ca"]);
  worksheetWork
    .getColumn("D")
    .eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      if (rowNumber != 1) {
        cell.dataValidation = {
          type: "list",
          allowBlank: true,
          formulae: ["Shift!$A$2:$A$2000"]
        };
      }
    });
  worksheetWork
    .getColumn("E")
    .eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      if (rowNumber != 1) {
        cell.value = { formula: `IF(D${rowNumber} = "", "", VLOOKUP(D${rowNumber},Shift!$A$2:$B$2000,2,0))` }
      }
    });
  workbook.xlsx.writeBuffer().then(function (data) {
    var blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
    FileSaver.saveAs(blob, 'Template_Import_Work.xlsx');
  });
}


MethodService.exportExcelWorkSynthetic = (data, salaryPeriod) => {
  let workbook = MethodService.createWookbook();
  workbook.properties.ignoredError = {
    number_stored_as_text: true
  }
  let worksheet = workbook.addWorksheet(`Bảng công tổng hợp`);
  worksheet.columns = [
    { header: "STT", key: "index", width: 6 },
    { header: "Mã nhân viên", key: "employee_no", width: 18 },
    { header: "Họ tên", key: "employee_name", width: 25 },
    { header: "Chức vụ", key: "position_name", width: 24 },
    { header: "Chi nhánh", key: "branch_name", width: 24 },
    { header: "Phòng ban", key: "department_name", width: 24 },
    { header: "Tổng công của kỳ", key: "total_work_of_period", width: 15 },
    { header: "Ca làm việc", key: "shift_name", width: 24 },
    { header: "Tổng công", key: "total_work", width: 15 },
    { header: "Nghỉ lễ / tết", key: "day_off", width: 11 },
    { header: "Nghỉ phép", key: "paid_leave", width: 11 },
    { header: "Nghỉ không lương", key: "unpaid_leave", width: 11 },
    { header: "Online / Công tác", key: "online", width: 11 },
    { header: "Tổng công tính lương", key: "total_salary_calculation", width: 12 },
    { header: "OT", key: "ot_time", width: 11 },
    { header: "Số lần đi muộn", key: "go_late_count", width: 11 },
    { header: "Số lần về sớm", key: "go_home_early_count", width: 11 }
  ];
  data.forEach((item, index) => {
    let cellObj = {};
    cellObj.index = index + 1;
    cellObj.employee_no = item.employee_no;
    cellObj.employee_name = item.employee_name;
    cellObj.position_name = item.position_name;
    cellObj.branch_name = item.branch_name;
    cellObj.department_name = item.department_name;
    cellObj.total_work_of_period = item.total_salary_calculation != undefined ? item.total_salary_calculation : 0;
    cellObj.shift_name = item.shift_code;
    cellObj.total_work = item.total_work;
    cellObj.day_off = item.day_off_count ? item.day_off_count : 0;
    cellObj.paid_leave = item.paid_leave ? item.paid_leave : 0;
    cellObj.unpaid_leave = item.unpaid_leave ? item.unpaid_leave : 0;
    cellObj.online = item.online && item.bussiness ? item.online + item.bussiness : 0;
    cellObj.total_salary_calculation = item.total_salary_calculation ? item.total_salary_calculation : 0;
    cellObj.ot_time = item.ot_time ? item.ot_time : 0;
    cellObj.go_late_count = item.go_late_count ? item.go_late_count : 0;
    cellObj.go_home_early_count = item.go_home_early_count ? item.go_home_early_count : 0;
    worksheet.addRow(cellObj);
  })
  let date = new Date(salaryPeriod.before_to_date);
  worksheet.insertRow(1);
  worksheet.insertRow(2);
  worksheet.getRow(1).height = 17;
  worksheet.mergeCells(`A1:B1`);
  worksheet.mergeCells(`C1:D1`);
  worksheet.getRow(1).getCell(1).value = "Thời gian";
  worksheet.getRow(1).getCell(3).value = `Từ ${MethodService.formatDate(salaryPeriod.from_date, "date")} đến ${MethodService.formatDate(date.setDate(date.getDate() - 1), "date")}`;
  // worksheet.getRow(5).height = 32;
  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    row.eachCell(function (cell, colNumber) {
      if (rowNumber == 3) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFE162" }
        };
        cell.font = { bold: true };
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true
        };
      } else {
        cell.alignment = {
          vertical: "middle",
          wrapText: true
        };
        if (rowNumber > 3 && colNumber === 1) {
          cell.alignment.horizontal = "center"
        }
      }
      // Set border of each cell
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
    });
  });
  workbook.xlsx.writeBuffer().then(function (data) {
    var blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
    FileSaver.saveAs(blob, `Bảng công tổng hợp tháng ${salaryPeriod.name}.xlsx`);
  });
}

MethodService.exportExcelWorkDetail = (data, salaryPeriod) => {
  let workbook = MethodService.createWookbook();
  let date = new Date(salaryPeriod.before_to_date);
  data.forEach((item, index) => {
    let worksheet = workbook.addWorksheet(`${item.employee_no} - ${item.full_name}`);
    worksheet.columns = [
      { header: "Ngày", key: "date", width: 15 },
      { header: "Ca làm việc", key: "shift_name", width: 25 },
      { header: "Giờ vào", key: "check_in", width: 11 },
      { header: "Giờ ra", key: "check_out", width: 11 },
      { header: "Đi muộn (Phút)", key: "go_late", width: 12 },
      { header: "Về sớm (Phút)", key: "ho_home_early", width: 12 },
      { header: "Tổng công", key: "total_work", width: 12 },
      { header: "Lý do", key: "reason", width: 30 },
    ];

    item.days.forEach((day, index) => {
      if (day.haveWork === false) return
      let cellValue = {};
      cellValue.date = MethodService.formatDate(new Date((new Date(salaryPeriod.from_date).getMonth() + 1) + '/' + day.date + '/' + new Date(salaryPeriod.from_date).getFullYear()), "date");
      cellValue.shift_name = day.shift_name;
      cellValue.check_in = day.checkin_time ?
        (day.checkin_time.hour != undefined && day.checkin_time.minute != undefined ?
          (day.checkin_time.hour < 10 ? "0" + day.checkin_time.hour : day.checkin_time.hour) +
          ':' +
          (day.checkin_time.minute < 10 ? "0" + day.checkin_time.minute : day.checkin_time.minute) : "")
        : "";
      cellValue.check_out = day.checkout_time ?
        (day.checkout_time.hour != undefined && day.checkout_time.minute != undefined ?
          (day.checkout_time.hour < 10 ? "0" + day.checkout_time.hour : day.checkout_time.hour) +
          ':' +
          (day.checkout_time.minute < 10 ? "0" + day.checkout_time.minute : day.checkout_time.minute) : "")
        : "";
      cellValue.go_late = Math.round(day.minute_go_late * 100) / 100;
      cellValue.ho_home_early = Math.round(day.minute_go_home_early * 100) / 100;
      cellValue.total_work = Math.round(day.work_value * 100) / 100;
      cellValue.reason = "";
      worksheet.addRow(cellValue);
    })
    worksheet.insertRow(1);
    worksheet.insertRow(2);
    worksheet.insertRow(3);
    worksheet.insertRow(4);
    worksheet.getRow(1).height = 16;
    worksheet.getRow(2).height = 16;
    worksheet.getRow(3).height = 16;
    worksheet.mergeCells(`B1:C1`);
    worksheet.mergeCells(`B2:C2`);
    worksheet.mergeCells(`B3:C3`);
    worksheet.getRow(1).getCell(1).value = "Thời gian";
    worksheet.getRow(1).getCell(2).value = `Từ ${MethodService.formatDate(salaryPeriod.from_date, "date")} đến ${MethodService.formatDate(date.setDate(date.getDate() - 1), "date")}`;
    worksheet.getRow(2).getCell(1).value = "Mã nhân viên";
    worksheet.getRow(2).getCell(2).value = "" + item.employee_no;
    worksheet.getRow(3).getCell(1).value = "Họ tên";
    worksheet.getRow(3).getCell(2).value = item.full_name;
    MethodService.styleRowAnotherExcel(worksheet);
  })
  workbook.xlsx.writeBuffer().then(function (data) {
    var blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    FileSaver.saveAs(blob, `Bảng công chi tiết tháng ${salaryPeriod.name}.xlsx`);
  });
}

MethodService.exportTemplateImportSalary = (listEmployee) => {
  let workbook = MethodService.createWookbook();
  let worksheet = workbook.addWorksheet("Lương", {
    views: [{ state: "frozen", xSplit: 2, ySplit: 1 }]
  });
  worksheet.columns = [
    { header: "Mã nhân viên (*)", key: "employee_no", width: 23 },
    { header: "Họ và tên", key: "last_name", width: 30 },
    { header: "Lương cơ bản", key: "space0", width: 20 },
    { header: "Phụ cấp trách nhiệm", key: "space1", width: 20 },
    { header: "Phụ cấp ăn trưa", key: "space2", width: 20 },
    { header: "Phụ cấp điện thoại", key: "space3", width: 20 },
    { header: "Phụ cấp xăng xe", key: "space4", width: 20 },
    { header: "Phụ cấp", key: "space5", width: 20 },
    { header: "Thưởng tháng", key: "space6", width: 20 },
    { header: "Phụ cấp thâm niên", key: "space7", width: 20 },
    { header: "Bảo hiểm xã hội (8%)", key: "space8", width: 17 },
    { header: "Bảo hiểm y tế (1,5%)", key: "space9", width: 17 },
    { header: "Bảo hiểm thất nghiệp (1%)", key: "space10", width: 20 },
    { header: "Bảo hiểm bắt buộc", key: "space11", width: 20 },
    { header: "Thuế thu nhập cá nhân", key: "space12", width: 20 },
    { header: "Tạm ứng", key: "space13", width: 20 },
    { header: "Khác", key: "space14", width: 20 },
    { header: "Tổng lương thực nhận  (*)", key: "space15", width: 20 },
  ];
  listEmployee.forEach(employee => {
    let item = {};
    item.employee_no = employee.employee_no ? employee.employee_no : "";
    item.last_name = employee.administrative_info && employee.administrative_info.name && employee.administrative_info.name.full_name ? employee.administrative_info.name.full_name : "";
    item.space0 = "";
    item.space1 = "";
    item.space2 = "";
    item.space3 = "";
    item.space4 = "";
    item.space5 = "";
    item.space6 = "";
    item.space7 = "";
    item.space8 = "";
    item.space9 = "";
    item.space10 = "";
    item.space11 = "";
    item.space12 = "";
    item.space13 = "";
    item.space14 = "";
    item.space15 = "";
    worksheet.addRow(item);
  });
  MethodService.styleRowExcel(worksheet);
  workbook.xlsx.writeBuffer().then(function (data) {
    var blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
    FileSaver.saveAs(blob, `Template Luong.xlsx`);
  });
}

MethodService.getHeader = (numberDay, today) => {
  let header = [
    { header: "Mã nhân viên", key: "employee_no", width: 17 },
    { header: "Tên nhân viên", key: "employee_name", width: 27 },
    { header: "Chi nhánh", key: "branch_name", width: 23 },
    { header: "Phòng ban", key: "department_name", width: 23 },
    { header: "Chức vụ", key: "position_name", width: 23 },
    { header: "Mã ca làm việc", key: "shift_code", width: 12 },
    { header: "Tổng công", key: "total_work", width: 12 },
  ];
  for (let i = 1; i <= numberDay; i++) {
    for (let j = 0; j < 3; j++) {
      let nameK = "";
      if (j == 0) {
        nameK = "work_" //go_late_
      } else if (j == 1) {
        nameK = "go_late_" //go_home_
      } else if (j == 2) {
        nameK = "go_home_" //work_
      }
      header.push({
        header: (i < 10 ? "0" + i.toString() : i.toString()) + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(), key: nameK + i, width: 10
      })
    }
  }
  return header
}

MethodService.getCellName = (worksheet, rowIndex, cellIndex) => {
  return worksheet.getRow(rowIndex).getCell(cellIndex)._address;
}

MethodService.checkValidate = (type, e) => {
  if (type == "blur" || type == "change") {
    if (e) {
      $(".el-select-validate").addClass("input-error");
      setTimeout(() => {
        let errorElement = $(".el-select-validate  > .el-form-item__error");
        if (errorElement.length == 0) {
          $(".input-error").append(`<div class="el-form-item__error"> Vui lòng chọn giá trị </div>`);
        }
      }, 0.1);
    } else {
      $(".el-select-validate").removeClass("input-error");
      $(".el-select-validate  > .el-form-item__error").remove();
    }
  } else if (type == "clear") {
    $(".el-select-validate  > .el-form-item__error").remove();
  }
}

export default MethodService;
