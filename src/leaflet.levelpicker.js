/**
 * Created by christopherfricke on 7/12/15.
 */

L.Control.LevelPicker = L.Control.extend({
    options: {
        position: 'bottomright',
        levelUpText: '+',
        levelDownText: '-'
    },

    initialize: function (options) {
        L.Util.setOptions(this, options);
    },

    onAdd: function (map) {
        // happens after added to map
        var self = this;
        if (this._map.hasOwnProperty('level') || this._map.level == null){
            this._map.level = 0;
        }
        this.levelListShowing = false;

        var container = L.DomUtil.create('div', 'level-picker leaflet-bar');
        this.upButton = L.DomUtil.create('a', 'level-picker-up', container);
        this.upButton.innerHTML = this.options.levelUpText;
        this.levelInfo = L.DomUtil.create('a', 'level-picker-level-info', container);
        this.downButton = L.DomUtil.create('a', 'level-picker-down', container);
        this.downButton.innerHTML = this.options.levelDownText;

        this.levels = L.DomUtil.create('div', 'level-list leaflet-bar', container);

        this.levelList = [];
        for (var i = this.options.levels.length; i > 0; i--){
            var btn = L.DomUtil.create('a', 'level-list-button', this.levels);
            btn.innerHTML = this.options.levels[i-1].level;
            btn.setAttribute('data-value', i-1);
            L.DomEvent.addListener(btn, 'click', function(a){
                self.selectLevel(a.target.getAttribute('data-value'))
            }, this);
            this.levelList.push(btn);
        }
        L.DomUtil.addClass(this.levelList[this.levelList.length - 1 - this._map.level], 'selected');
        L.DomEvent.addListener(this.upButton, 'click', this.changeLevelUp, this);
        L.DomEvent.addListener(this.levelInfo, 'click', this.showLevelList, this);
        L.DomEvent.addListener(this.downButton, 'click', this.changeLevelDown, this);
        L.DomEvent.disableClickPropagation(container);
        this.updateSelectedLevelInfo();

        return container;
    },
    onRemove: function (map) {
        L.DomEvent.removeListener(this.upButton, 'click', this.changeLevelUp, this);
        L.DomEvent.removeListener(this.levelInfo, 'click', this.showLevelList, this);
        L.DomEvent.removeListener(this.downButton, 'click', this.changeLevelDown, this);
        for (var i in this.levelList){
            L.DomEvent.removeListener(this.levelList[i], 'click', function(a){
                self.selectLevel(a.target.getAttribute('data-value'))
            }, this);
        }
    },
    /**
     * Change the selected level to levelIndex
     * @param levelIndex
     */
    changeLevel: function(levelIndex){
        if (levelIndex < 0 ||
            levelIndex >= this.options.levels.length ||
            levelIndex === this._map.level){
            return;
        }
        L.DomUtil.removeClass(this.levelList[this.levelList.length - 1 - this._map.level], 'selected');

        this._map.level = levelIndex;
        this._map.fireEvent('level.change', this._map.level);
        this.updateSelectedLevelInfo();

        L.DomUtil.addClass(this.levelList[this.levelList.length - 1 - levelIndex], 'selected');
    },
    /**
     * Bump the level up
     */
    changeLevelUp: function(){
        this.changeLevel(this._map.level + 1);
    },
    /**
     * Bump the level down
     */
    changeLevelDown: function(){
        this.changeLevel(this._map.level - 1);
    },
    /**
     * Select a specific level
     * @param levelIndex
     */
    selectLevel: function(levelIndex){
        this.changeLevel(parseInt(levelIndex));
        this.showLevelList();
    },
    /**
     * Display or hide the level pick list
     */
    showLevelList: function(){
        this.levelListShowing = !this.levelListShowing;
        if (this.levelListShowing){
            L.DomUtil.addClass(this.levels, 'show');
        } else {
            L.DomUtil.removeClass(this.levels, 'show');
        }
    },
    updateSelectedLevelInfo: function(){
        this.levelInfo.innerHTML = this.options.levels[this._map.level].level;
    }
});