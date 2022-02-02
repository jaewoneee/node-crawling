"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var getInfo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var userName;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userName = '아니근데솔직히진짜';
            userName = encodeURI(userName);
            _context.prev = 2;
            _context.next = 5;
            return _axios["default"].get("https://lostark.game.onstove.com/Profile/Character/".concat(userName));

          case 5:
            return _context.abrupt("return", _context.sent);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);
            console.error(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 8]]);
  }));

  return function getInfo() {
    return _ref.apply(this, arguments);
  };
}();

getInfo().then(function (html) {
  var $ = _cheerio["default"].load(html.data);

  var test = $('.level-info__expedition').children('span').text();
  console.log(test);
})["catch"](function (err) {
  return console.error(err);
});
getInfo();