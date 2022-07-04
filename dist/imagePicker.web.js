"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = {
  container: {
    display: "flex",
    cursor: "pointer"
  },
  input: {
    border: 0,
    width: 0,
    height: 0,
    visibility: "hidden",
    display: "none"
  }
};

function handleUpload(onComplete, onFail) {
  return function (event) {
    var file = event.target.files[0];

    if (!/^image\//.test(file.type)) {
      var data = {
        cancelled: false,
        error: "Not an image."
      };
      onFail(data);
      return;
    }

    var reader = new FileReader();

    reader.onload = function (event) {
      var image = new Image();
      image.src = event.target.result;

      image.onload = function (event) {
        var _event$target = event.target,
            width = _event$target.width,
            height = _event$target.height;
        var uri = event.target.src;
        var data = {
          cancelled: false,
          uri: uri,
          width: width,
          height: height
        };
        onComplete(data);
      };
    };

    reader.onerror = function (err) {
      var data = {
        cancelled: false,
        error: err
      };
      onFail(data);
    };

    reader.onabort = function (err) {
      var data = {
        cancelled: false,
        error: err
      };
      onFail(data);
    };

    reader.readAsDataURL(file);
  };
}

function _default(_ref) {
  var style = _ref.style,
      onComplete = _ref.onComplete,
      onFail = _ref.onFail,
      children = _ref.children;

  var containerStyle = _objectSpread(_objectSpread({}, styles.container), style);

  return /*#__PURE__*/_react["default"].createElement("label", {
    onChange: handleUpload(onComplete, onFail),
    style: containerStyle
  }, /*#__PURE__*/_react["default"].createElement("input", {
    style: styles.input,
    type: "file",
    accept: "image/*"
  }), children);
}