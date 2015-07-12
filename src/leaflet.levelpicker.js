/**
 * Created by christopherfricke on 7/12/15.
 */

L.Control.LevelPicker = L.Control.extend({
    options: {
        position: 'topright',
        levelUpText: '+',
        levelDownText: '-'
    },
    initialize: function (options) {
        L.Util.setOptions(this, options);
    },
    onAdd: function (map) {
        // happens after added to map
        if (this._map.hasOwnProperty('level') || this._map.level == null){
            this._map.level = 0;
        }

        var container = L.DomUtil.create('div', 'level-picker leaflet-bar');
        this.upButton = L.DomUtil.create('a', 'level-picker-up', container);
        this.upButton.innerHTML = this.options.levelUpText;
        this.levelInfo = L.DomUtil.create('span', 'level-picker-level-info', container);
        this.downButton = L.DomUtil.create('a', 'level-picker-down', container);
        this.downButton.innerHTML = this.options.levelDownText;


        this.updateSelectedLevelInfo();

        L.DomEvent.addListener(this.upButton, 'click', this.changeLevelUp, this);
        L.DomEvent.addListener(this.downButton, 'click', this.changeLevelDown, this);
        L.DomEvent.disableClickPropagation(container);

        return container;
    },
    onRemove: function (map) {
        L.DomEvent.removeListener(this.upButton, 'click', this.changeLevelUp, this);
        L.DomEvent.removeListener(this.downButton, 'click', this.changeLevelDown, this);
    },
    changeLevelUp: function () {
        this.changeLevel(1);
    },
    changeLevelDown: function () {
        this.changeLevel(-1);
    },
    changeLevel: function (i) {
        if ((i < 0 && this._map.level <= 0) ||
            (i > 0 && this._map.level >= this.options.levels.length - 1)) {
            return;
        }

        this._map.level += i;
        this.updateSelectedLevelInfo();
    },
    updateSelectedLevelInfo: function () {
        this.levelInfo.innerHTML = this.options.levels[this._map.level].level;

        this._map.fireEvent('level.change', this._map.level);
    }
});