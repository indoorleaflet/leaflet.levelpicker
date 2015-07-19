/**
 * Created by christopherfricke on 7/12/15.
 */

L.Control.LevelPicker = L.Control.extend({
    options: {
        position: 'bottomright',
        levelUpText: '+',
        levelDownText: '-',
        maxHeight: '200px',
        selectedLevel: 1,
        enableLevelList: false,
        levels:[]
    },
    /**
     * Fires on init of controller
     * @param options
     */
    initialize: function (options) {
        L.Util.setOptions(this, options);
        this.levelListShowing = false;
        this.levelListButtons = [];
    },
    /**
     * Fires on add of controller to app
     * @param map
     * @returns {div}
     */
    onAdd: function (map) {
        var self = this;

        // Set level of map to default if not already set
        if (this._map.hasOwnProperty('level') || this._map.level == null){
            this._map.level = this.options.selectedLevel;
        }

        // Initialize HTML elements
        var container = L.DomUtil.create('div', 'level-picker leaflet-bar');
        L.DomEvent.on(container, 'mousewheel', L.DomEvent.stopPropagation);
        L.DomEvent.disableClickPropagation(container);

        // Add Up button
        this.upButton = L.DomUtil.create('a', 'level-picker-up', container);
        this.upButton.innerHTML = this.options.levelUpText;
        L.DomEvent.addListener(this.upButton, 'click', this.changeLevelUp, this);

        // Add Level Info and add click event to show level info IF enableLevelList is set
        this.levelInfo = L.DomUtil.create('a', 'level-picker-level-info', container);
        if (this.options.enableLevelList){
            L.DomUtil.addClass(this.levelInfo, 'enable-level-list');
            L.DomEvent.addListener(this.levelInfo, 'click', this.showLevelList, this);
        }

        // Add Down button
        this.downButton = L.DomUtil.create('a', 'level-picker-down', container);
        this.downButton.innerHTML = this.options.levelDownText;
        L.DomEvent.addListener(this.downButton, 'click', this.changeLevelDown, this);

        // If Enable Level List is true then add all the levels to the level list container
        if (this.options.enableLevelList) {
            this.levelListContainer = L.DomUtil.create('div', 'level-list leaflet-bar', container);
            this.levelListButtonsContainer = L.DomUtil.create('div', 'pass', this.levelListContainer);
            this.levelListButtonsContainer.setAttribute('style', "max-height: " + this.options.maxHeight);

            for (var i = this.options.levels.length; i > 0; i--) {
                var btn = L.DomUtil.create('a', 'level-list-button', this.levelListButtonsContainer);
                btn.innerHTML = this.options.levels[i - 1].level;
                btn.setAttribute('data-value', i-1);
                L.DomEvent.addListener(btn, 'click', function (a) {
                    self.selectLevel(a.target.getAttribute('data-value'))
                }, this);
                this.levelListButtons.push(btn);
            }

            L.DomUtil.addClass(this.levelListButtons[this.levelListButtons.length - 1 - this._map.level], 'selected');
        }

        this.updateSelectedLevelInfo();

        return container;
    },
    /**
     * Fires on removal of controller to app
     * Remove All the click events on elements
     * @param map
     * @returns {div}
     */
    onRemove: function (map) {
        L.DomEvent.removeListener(this.upButton, 'click', this.changeLevelUp, this);
        L.DomEvent.removeListener(this.levelInfo, 'click', this.showLevelList, this);
        L.DomEvent.removeListener(this.downButton, 'click', this.changeLevelDown, this);

        if (this.options.enableLevelList) {
            for (var i in this.levelListButtons) {
                L.DomEvent.removeListener(this.levelListButtons[i], 'click', function (a) {
                    self.selectLevel(a.target.getAttribute('data-value'))
                }, this);
            }
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
        L.DomUtil.removeClass(this.levelListButtons[this.levelListButtons.length - 1 - this._map.level], 'selected');

        this._map.level = levelIndex;
        this._map.fireEvent('level.change', this._map.level);
        this.updateSelectedLevelInfo();

        L.DomUtil.addClass(this.levelListButtons[this.levelListButtons.length - 1 - levelIndex], 'selected');
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
        if (!this.options.enableLevelList) return;

        this.levelListShowing = !this.levelListShowing;
        if (this.levelListShowing){
            L.DomUtil.addClass(this.levelListContainer, 'show');
            L.DomUtil.addClass(this.levelInfo, 'selected');
        } else {
            L.DomUtil.removeClass(this.levelListContainer, 'show');
            L.DomUtil.removeClass(this.levelInfo, 'selected');
        }
    },
    /**
     * Update selected level text
     */
    updateSelectedLevelInfo: function(){
        this.levelInfo.innerHTML = this.options.levels[this._map.level].level;
    }
});