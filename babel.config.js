const presets = [
    [
        "@babel/preset-env",
        {
            useBuiltIns: "usage", // эта настройка babel-polyfill, если стоит значение usage, то будут подставлятся полифилы для версий браузеров которые указали ниже.
            corejs: "3.4.1", // явно проставить версию corejs
            modules: false,
            loose: true
        }
    ],
];
  
module.exports = { presets };