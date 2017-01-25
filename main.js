var OWI = angular.module('OWI', [])

OWI.config(['$compileProvider', function($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}])

OWI.controller('MainCtrl', ["$scope", function($scope) {
  var vm = this;

  this.preview = false;

  // Load any saved data from localstorage
  var onStartup = function() {
    vm.checked = {
      legendary: {},
      epic: {},
      emotes: {},
      intros: {},
      sprays: {},
      voicelines: {},
      victoryposes: {},
      icons: {}
    }

    var data = localStorage.getItem('data')
    if (data) {
      vm.checked = JSON.parse(data)
      $scope.$digest()
    }
  }

  this.reset = function() {
    console.log("reset")
    localStorage.removeItem('data')
    onStartup()
  }

  // Update localstorage on new data
  this.onSelect = function() {
    localStorage.setItem('data', JSON.stringify(this.checked))
  }

  var showTimeout = undefined;
  var hideTimeout = undefined;
  this.showPreview = function(what) {
    if (showTimeout) return
    clearTimeout(hideTimeout)
    showTimeout = setTimeout(function () {
      vm.preview = what
      $scope.$digest()
    }, vm.preview ? 100 : 650);
  }

  this.hidePreview = function(what) {
    clearTimeout(showTimeout);
    showTimeout = undefined;
    hideTimeout = setTimeout(function () {
      vm.preview = false;
      $scope.$digest()
    }, 150);
  }

  var heroes = [
    "Ана", "Бастион", "D.Va", "Гэндзи", "Хандзо",
    "Крысавчик", "Лусио", "Маккри", "Мэй", "Ангел",
    "Фарра", "Жнец", "Райнхардт", "Турбосвин",
    "Солдат-76", "Сомбра", "Симметра", "Торбьорн", "Трейсер",
    "Роковая вдова", "Уинстон", "Заря", "Дзенъятта"
  ]
  this.items = {
    skins: {
      legendary: [{
        name: "Паланкин",
        img: "https://overwiki.ru/images/7/78/D.Va-%D0%9F%D0%B0%D0%BB%D0%B0%D0%BD%D0%BA%D0%B8%D0%BD.jpg"
      }, {
        name: "Луна",
        img: "https://overwiki.ru/images/d/d2/%D0%9C%D1%8D%D0%B9-%D0%9B%D1%83%D0%BD%D0%B0.jpg"
      }, {
        name: "Чанъэ",
        img: "https://overwiki.ru/images/f/ff/%D0%9C%D1%8D%D0%B9-%D0%A7%D0%B0%D0%BD%D1%8A%D1%8D.jpg"
      }, {
        name: "Бацзе",
        img: "https://overwiki.ru/images/e/ef/%D0%A2%D1%83%D1%80%D0%B1%D0%BE%D1%81%D0%B2%D0%B8%D0%BD-%D0%91%D0%B0%D1%86%D0%B7%D0%B5.jpg"
      }, {
        name: "Сюаньцзан",
        img: "https://overwiki.ru/images/5/55/%D0%94%D0%B7%D0%B5%D0%BD%D1%8A%D1%8F%D1%82%D1%82%D0%B0-%D0%A1%D1%8E%D0%B0%D0%BD%D1%8C%D1%86%D0%B7%D0%B0%D0%BD.jpg"
      }, {
          name: "У-цзин",
          img: "https://overwiki.ru/images/4/46/%D0%A0%D0%B0%D0%B9%D0%BD%D1%85%D0%B0%D1%80%D0%B4%D1%82-%D0%A3-%D1%86%D0%B7%D0%B8%D0%BD.jpg"
      }, {
          name: "У-кун",
          img: "https://overwiki.ru/images/a/a0/%D0%A3%D0%B8%D0%BD%D1%81%D1%82%D0%BE%D0%BD-%D0%A3-%D0%BA%D1%83%D0%BD.jpg"
      }],
      epic: [{
        name: "Крысавчик (Фейерверк)",
        img: "https://overwiki.ru/images/1/15/%D0%9A%D1%80%D1%8B%D1%81%D0%B0%D0%B2%D1%87%D0%B8%D0%BA-%D0%A4%D0%B5%D0%B9%D0%B5%D1%80%D0%B2%D0%B5%D1%80%D0%BA.jpg"
      }, {
        name: "Ангел (Золото)",
        img: "https://overwiki.ru/images/5/5d/%D0%90%D0%BD%D0%B3%D0%B5%D0%BB-%D0%97%D0%BE%D0%BB%D0%BE%D1%82%D0%BE.jpg"
      }, {
        name: "Симметра (Ципао)",
        img: "https://overwiki.ru/images/b/b5/%D0%A1%D0%B8%D0%BC%D0%BC%D0%B5%D1%82%D1%80%D0%B0-%D0%A6%D0%B8%D0%BF%D0%B0%D0%BE.jpg"
      }, {
        name: "Бастион (Кукаробот)",
        img: "https://overwiki.ru/images/6/6f/%D0%91%D0%B0%D1%81%D1%82%D0%B8%D0%BE%D0%BD-%D0%9A%D1%83%D0%BA%D0%B0%D1%80%D0%BE%D0%B1%D0%BE%D1%82.jpg"
      }, {
        name: "Трейсер (Роза)",
        img: "https://overwiki.ru/images/5/5a/%D0%A2%D1%80%D0%B5%D0%B9%D1%81%D0%B5%D1%80-%D0%A0%D0%BE%D0%B7%D0%B0.jpg"
      }, {
        name: "Ана (Тхаль)",
        img: "https://overwiki.ru/images/f/f5/%D0%90%D0%BD%D0%B0-%D0%A2%D1%85%D0%B0%D0%BB%D1%8C.jpg"
      }]
    },
    "intros": [{
      "name": "Турбосвин (Обжорство)",
      "video": ""
    }, {
      "name": "Ангел (Удача)",
      "video": ""
    }, {
        "name": "Трейсер (Танец льва)",
        "video": ""
    }],
    emotes: [
      "D.Va (Поклон)", "Крысавчик (Бомбанем?)", "Мэй (Как классно!)"
    ],

    voicelines: heroes,
      "sprays": [{
          "name": "D.Va (Танец дракона)",
          "img": "https://overwiki.ru/images/b/b8/D.Va-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
      },{
          "name": "D.Va (Качели)",
          "img": "https://overwiki.ru/images/a/ac/D.Va-%D0%9A%D0%B0%D1%87%D0%B5%D0%BB%D0%B8-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
      }, {
          "name": "Ана (Танец дракона)",
          "img": "https://overwiki.ru/images/e/ec/%D0%90%D0%BD%D0%B0-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
      }, {
          "name": "Ана (Танец)",
          "img": "https://overwiki.ru/images/c/c9/%D0%90%D0%BD%D0%B0-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
      }, {
          "name": "Ангел (Танец дракона)",
          "img": "https://overwiki.ru/images/2/2f/%D0%90%D0%BD%D0%B3%D0%B5%D0%BB-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
      }, {
          "name": "Ангел (Зонтик)",
          "img": "https://overwiki.ru/images/2/29/%D0%90%D0%BD%D0%B3%D0%B5%D0%BB-%D0%97%D0%BE%D0%BD%D1%82%D0%B8%D0%BA-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
      }, {
          "name": "Бастион (Танец дракона)",
          "img": "https://overwiki.ru/images/f/f7/%D0%91%D0%B0%D1%81%D1%82%D0%B8%D0%BE%D0%BD-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
      }, {
          "name": "Бастион (Вкусняшкобот)",
          "img": "https://overwiki.ru/images/f/f8/%D0%91%D0%B0%D1%81%D1%82%D0%B8%D0%BE%D0%BD-%D0%92%D0%BA%D1%83%D1%81%D0%BD%D1%8F%D1%88%D0%BA%D0%BE%D0%B1%D0%BE%D1%82-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
      }, {
          "name": "Гэндзи (Танец дракона)",
          "img": "https://overwiki.ru/images/5/5a/%D0%93%D1%8D%D0%BD%D0%B4%D0%B7%D0%B8-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
      }, {
          "name": "Гэндзи (Зеленый дракон)",
          "img": "https://overwiki.ru/images/8/81/%D0%93%D1%8D%D0%BD%D0%B4%D0%B7%D0%B8-%D0%97%D0%B5%D0%BB%D0%B5%D0%BD%D1%8B%D0%B9_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
      }, {
          "name": "Дзенъятта (Танец дракона)",
          "img": "https://overwiki.ru/images/d/d6/%D0%94%D0%B7%D0%B5%D0%BD%D1%8A%D1%8F%D1%82%D1%82%D0%B0-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
      }, {
          "name": "Дзенъятта (Ют нори)",
          "img": "https://overwiki.ru/images/0/0f/%D0%94%D0%B7%D0%B5%D0%BD%D1%8A%D1%8F%D1%82%D1%82%D0%B0-%D0%AE%D1%82_%D0%BD%D0%BE%D1%80%D0%B8-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
      }, {
          "name": "Жнец (Танец дракона)",
          "img": "https://overwiki.ru/images/8/8d/%D0%96%D0%BD%D0%B5%D1%86-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
      }, {
          "name": "Жнец (Огненный цветок)",
          "img": "https://overwiki.ru/images/2/28/%D0%96%D0%BD%D0%B5%D1%86-%D0%9E%D0%B3%D0%BD%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9_%D1%86%D0%B2%D0%B5%D1%82%D0%BE%D0%BA-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
      }, {
          "name": "Заря (Танец дракона)",
          "img": "https://overwiki.ru/images/f/f7/%D0%97%D0%B0%D1%80%D1%8F-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
      }, {
          "name": "Заря (На массе)",
          "img": "https://overwiki.ru/images/3/32/%D0%97%D0%B0%D1%80%D1%8F-%D0%9D%D0%B0_%D0%BC%D0%B0%D1%81%D1%81%D0%B5-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
      },
          {
              "name": "Крысавчик (Танец дракона)",
              "img": "https://overwiki.ru/images/8/88/%D0%9A%D1%80%D1%8B%D1%81%D0%B0%D0%B2%D1%87%D0%B8%D0%BA-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Крысавчик (Я лечу!)",
              "img": "https://overwiki.ru/images/a/a8/%D0%9A%D1%80%D1%8B%D1%81%D0%B0%D0%B2%D1%87%D0%B8%D0%BA-%D0%AF_%D0%BB%D0%B5%D1%87%D1%83%21-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Лусио (Танец дракона)",
              "img": "https://overwiki.ru/images/b/bc/%D0%9B%D1%83%D1%81%D0%B8%D0%BE-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Лусио (Давай на счет!)",
              "img": "https://overwiki.ru/images/6/66/%D0%9B%D1%83%D1%81%D0%B8%D0%BE-%D0%94%D0%B0%D0%B2%D0%B0%D0%B9_%D0%BD%D0%B0_%D1%81%D1%87%D0%B5%D1%82%21-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Маккри (Танец дракона)",
              "img": "https://overwiki.ru/images/6/62/%D0%9C%D0%B0%D0%BA%D0%BA%D1%80%D0%B8-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Маккри (Орел или решка?)",
              "img": "https://overwiki.ru/images/e/e0/%D0%9C%D0%B0%D0%BA%D0%BA%D1%80%D0%B8-%D0%9E%D1%80%D0%B5%D0%BB_%D0%B8%D0%BB%D0%B8_%D1%80%D0%B5%D1%88%D0%BA%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Мэй (Танец дракона)",
              "img": "https://overwiki.ru/images/f/f9/%D0%9C%D1%8D%D0%B9-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Мэй (Удача)",
              "img": "https://overwiki.ru/images/e/e7/%D0%9C%D1%8D%D0%B9-%D0%A3%D0%B4%D0%B0%D1%87%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Райнхардт (Танец дракона)",
              "img": "https://overwiki.ru/images/8/8c/%D0%A0%D0%B0%D0%B9%D0%BD%D1%85%D0%B0%D1%80%D0%B4%D1%82-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Райнхардт (Танец льва)",
              "img": "https://overwiki.ru/images/f/f5/%D0%A0%D0%B0%D0%B9%D0%BD%D1%85%D0%B0%D1%80%D0%B4%D1%82-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%BB%D1%8C%D0%B2%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Роковая вдова (Танец дракона)",
              "img": "https://overwiki.ru/images/2/21/%D0%A0%D0%BE%D0%BA%D0%BE%D0%B2%D0%B0%D1%8F_%D0%B2%D0%B4%D0%BE%D0%B2%D0%B0-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Роковая вдова (Заколка)",
              "img": "https://overwiki.ru/images/7/79/%D0%A0%D0%BE%D0%BA%D0%BE%D0%B2%D0%B0%D1%8F_%D0%B2%D0%B4%D0%BE%D0%B2%D0%B0-%D0%97%D0%B0%D0%BA%D0%BE%D0%BB%D0%BA%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Симметра (Танец дракона)",
              "img": "https://overwiki.ru/images/1/1b/%D0%A1%D0%B8%D0%BC%D0%BC%D0%B5%D1%82%D1%80%D0%B0-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Симметра (Фонарь)",
              "img": "https://overwiki.ru/images/f/f2/%D0%A1%D0%B8%D0%BC%D0%BC%D0%B5%D1%82%D1%80%D0%B0-%D0%A4%D0%BE%D0%BD%D0%B0%D1%80%D1%8C-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Солдат-76 (Танец дракона)",
              "img": "https://overwiki.ru/images/1/10/%D0%A1%D0%BE%D0%BB%D0%B4%D0%B0%D1%82-76-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Солдат-76 (Сложенные руки)",
              "img": "https://overwiki.ru/images/1/13/%D0%A1%D0%BE%D0%BB%D0%B4%D0%B0%D1%82-76-%D0%A1%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5_%D1%80%D1%83%D0%BA%D0%B8-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Сомбра (Танец дракона)",
              "img": "https://overwiki.ru/images/3/39/%D0%A1%D0%BE%D0%BC%D0%B1%D1%80%D0%B0-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Сомбра (Гадание)",
              "img": "https://overwiki.ru/images/1/1d/%D0%A1%D0%BE%D0%BC%D0%B1%D1%80%D0%B0-%D0%93%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Торбьорн (Танец дракона)",
              "img": "https://overwiki.ru/images/7/78/%D0%A2%D0%BE%D1%80%D0%B1%D1%8C%D0%BE%D1%80%D0%BD-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Торбьорн (Золото)",
              "img": "https://overwiki.ru/images/f/f9/%D0%A2%D0%BE%D1%80%D0%B1%D1%8C%D0%BE%D1%80%D0%BD-%D0%97%D0%BE%D0%BB%D0%BE%D1%82%D0%BE-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Трейсер (Танец дракона)",
              "img": "https://overwiki.ru/images/0/08/%D0%A2%D1%80%D0%B5%D0%B9%D1%81%D0%B5%D1%80-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Трейсер (Танец с веерами)",
              "img": "https://overwiki.ru/images/a/ab/%D0%A2%D1%80%D0%B5%D0%B9%D1%81%D0%B5%D1%80-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D1%81_%D0%B2%D0%B5%D0%B5%D1%80%D0%B0%D0%BC%D0%B8-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Турбосвин (Танец дракона)",
              "img": "https://overwiki.ru/images/e/ed/%D0%A2%D1%83%D1%80%D0%B1%D0%BE%D1%81%D0%B2%D0%B8%D0%BD-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Турбосвин (Баоцзы)",
              "img": "https://overwiki.ru/images/a/a9/%D0%A2%D1%83%D1%80%D0%B1%D0%BE%D1%81%D0%B2%D0%B8%D0%BD-%D0%91%D0%B0%D0%BE%D1%86%D0%B7%D1%8B-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Уинстон (Танец дракона)",
              "img": "https://overwiki.ru/images/8/8f/%D0%A3%D0%B8%D0%BD%D1%81%D1%82%D0%BE%D0%BD-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Уинстон (Воздушный змей)",
              "img": "https://overwiki.ru/images/d/db/%D0%A3%D0%B8%D0%BD%D1%81%D1%82%D0%BE%D0%BD-%D0%92%D0%BE%D0%B7%D0%B4%D1%83%D1%88%D0%BD%D1%8B%D0%B9_%D0%B7%D0%BC%D0%B5%D0%B9-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Фарра (Танец дракона)",
              "img": "https://overwiki.ru/images/0/01/%D0%A4%D0%B0%D1%80%D1%80%D0%B0-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Фарра (С новым годом!)",
              "img": "https://overwiki.ru/images/8/8a/%D0%A4%D0%B0%D1%80%D1%80%D0%B0-%D0%A1_%D0%BD%D0%BE%D0%B2%D1%8B%D0%BC_%D0%B3%D0%BE%D0%B4%D0%BE%D0%BC%21-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Хандзо (Танец дракона)",
              "img": "https://overwiki.ru/images/1/1f/%D0%A5%D0%B0%D0%BD%D0%B4%D0%B7%D0%BE-%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Год петуха",
              "img": "https://overwiki.ru/images/0/0c/%D0%9E%D0%B1%D1%89%D0%B8%D0%B5-%D0%93%D0%BE%D0%B4_%D0%BF%D0%B5%D1%82%D1%83%D1%85%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Голова дракона",
              "img": "https://overwiki.ru/images/2/22/%D0%9E%D0%B1%D1%89%D0%B8%D0%B5-%D0%93%D0%BE%D0%BB%D0%BE%D0%B2%D0%B0_%D0%B4%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Красный конверт",
              "img": "https://overwiki.ru/images/3/36/%D0%9E%D0%B1%D1%89%D0%B8%D0%B5-%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D1%8B%D0%B9_%D0%BA%D0%BE%D0%BD%D0%B2%D0%B5%D1%80%D1%82-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }, {
              "name": "Предсказания",
              "img": "https://overwiki.ru/images/a/a8/%D0%9E%D0%B1%D1%89%D0%B8%D0%B5-%D0%9F%D1%80%D0%B5%D0%B4%D1%81%D0%BA%D0%B0%D0%B7%D0%B0%D0%BD%D0%B8%D1%8F-%D0%93%D1%80%D0%B0%D1%84%D1%84%D0%B8%D1%82%D0%B8.png"
          }],
    "victoryposes": [{
      "name": "Крысавчик (Опасно для здоровья)",
      "img": ""
    }, {
      "name": "Бастион (Фейерверк)",
      "img": ""
    }, {
      "name": "Ана (Сложенные руки)",
      "img": ""
    }, {
      "name": "D.Va (Предсказания)",
      "img": ""
    }, {
      "name": "Мэй (Удачка!)",
      "img": ""
    }, {
      "name": "Сомбра (Бенгальские огни)",
      "img": ""
    }, {
      "name": "Турбосвин (Мое! Не отдам!)",
      "img": ""
    }],
    "icons": [{
        "name": "Бокимари",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/6/6e/PI_Bokimari.png"
    }, {
        "name": "Чанъэ",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/8/8b/PI_Chang%27e.png"
    }, {
        "name": "Монетка",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/8/84/PI_Coin.png"
    }, {
        "name": "Дракон",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/9/9b/PI_Dragon_Dance.png"
    }, {
        "name": "Гадание",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/9/9b/PI_Dragon_Dance.png"
    }, {
        "name": "Футимари",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/c/c8/PI_Fuchimari.png"
    }, {
        "name": "Золото",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/e/e8/PI_Gold.png"
    }, {
        "name": "Ханбок",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/9/95/PI_Hanbok.png"
    }, {
        "name": "Печеная рыба",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/1/1a/PI_Have_Fish.png"
    }, {
        "name": "Фонарь",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/6/61/PI_Lantern.png"
    }, {
        "name": "Обезьяна",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/3/3d/PI_Monkey.png"
    }, {
        "name": "Новогодний торт",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/d/d9/PI_New_Year_Cake.png"
    }, {
        "name": "Пачи-фонарь",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/9/99/PI_Pachilantern.png"
    }, {
        "name": "Бацзе",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/4/44/PI_Piggy.png"
    }, {
        "name": "Красный конверт",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/1/12/PI_Red_Envelope.png"
    }, {
        "name": "Ша сэн",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/4/42/PI_Sandy.png"
    }, {
        "name": "Сюаньцзан",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/2/21/PI_Sanzang.png"
    }, {
        "name": "Соллаль",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/2/25/PI_Seollal.png"
    }, {
        "name": "Мандаринки",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/1/1e/PI_Tangerines.png"
    }, {
        "name": "Дрейдл",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/5/5b/PI_Year_Of_The_Rooster_2017.png"
    }, {
        "name": "Празднуем!",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/d/d0/PI_Cheers%21.png"
    }, {
        "name": "Конфетная палочка",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/4/4d/PI_Candy_Cane.png"
    }, {
        "name": "Игристое",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/a/a4/PI_Bubbly.png"
    }, {
        "name": "Колокольчики",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/1/16/PI_Bells.png"
    }, {
        "name": "Год петуха 2017",
        "img": "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/2/22/PI_2017.png"
    }]
  }

  // Defer the starup so the initial digest finishes
  setTimeout(function () {
    onStartup()
  }, 0);
}])
