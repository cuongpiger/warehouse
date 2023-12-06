'use strict';

angular.module('challenge.items', [])
.service('challenge.items.service', challengeItemService);

challengeItemService.$inject = ['$http', '$localStorage', 'challenge.io.service'];

function challengeItemService($http, $localStorage, socket) {
  const ITEM_FREEZE = 'freeze';
  const ITEM_UNFREEZE = 'unfreeze';
  const ITEM_BOMB = 'bomb';
  const ITEM_HEALTH = 'health';

  let defaultItems = {};
  defaultItems[ITEM_FREEZE] = 0;
  defaultItems[ITEM_UNFREEZE] = 0;
  defaultItems[ITEM_BOMB] = 0;
  defaultItems[ITEM_HEALTH] = 0;

  return {
    _items: defaultItems,
    _bonusStat: {
      gold_chest: 0,
      silver_chest: null,
      invite: false
    },

    get: getItems,
    fetch: fetchItems,
    sync: syncLocalItems,

    canUse: canUseItem,
    useFreeze: useFreezeItem,
    useUnfreeze: useUnfreezeItem,
    useBomb: useBombItem,
    useHealth: useHealthItem,

    getBonusStat: getBonusStat,
    fetchBonusStat: fetchBonusStat,
    openGoldChest: openGoldChest,
    openSilverChest: openSilverChest,
    openWinChest: openWinChest,
    onOpenBonus: onOpenBonus
  };

  function getItems() {
    return this._items;
  }

  function fetchItems() {
    if ($localStorage.ability && !angular.equals({}, $localStorage.ability)) {
      return this.sync();
    } else {
        return socket.fetchItems({
          guest_id: $localStorage.guest_id
        }).then((response) => {
          if (response.status == 'success') {
            this._items = response.items;
          } else {
            // TODO
          }
        });
    }
  }

  /**
   * Sync items in local storages to mongodb
   * We do not save user items in database before
   * We decided to do that now, so we need to sync old items data
   * @return {void}
   */
  function syncLocalItems() {
    let localItems = $localStorage.ability;
    let user = $localStorage.auth || {};
    let guestId = $localStorage.guest_id;

    return socket.syncLocalItems({
      guest_id: guestId,
      items: localItems
    }).then((response) => {
      response = response || {};

      if (response.status == 'success') {
        delete $localStorage.ability;
        this._items = response.items;
      } else {
        // TODO
      }
    })
  }

  function canUseItem(item) {
    return this._items[item] && this._items[item] > 0;
  }

  function useFreezeItem(roomName) {
    // TODO: assuming request will be success, so user can see item reduced immediately
    // Test the latency later
    this._items[ITEM_FREEZE] = Math.max(0, this._items[ITEM_FREEZE] - 1);

    return socket.useItem(ITEM_FREEZE, roomName, $localStorage.guest_id);
  }

  function useUnfreezeItem(roomName) {
    // TODO: assuming request will be success, so user can see item reduced immediately
    // Test the latency later
    this._items[ITEM_UNFREEZE] = Math.max(0, this._items[ITEM_UNFREEZE] - 1);

    return socket.useItem(ITEM_UNFREEZE, roomName, $localStorage.guest_id);
  }

  function useBombItem(roomName) {
    // TODO: assuming request will be success, so user can see item reduced immediately
    // Test the latency later
    this._items[ITEM_BOMB] = Math.max(0, this._items[ITEM_BOMB] - 1);

    return socket.useItem(ITEM_BOMB, roomName, $localStorage.guest_id);
  }

  function useHealthItem(roomName) {
    // TODO: assuming request will be success, so user can see item reduced immediately
    // Test the latency later
    this._items[ITEM_HEALTH] = Math.max(0, this._items[ITEM_HEALTH] - 1);

    return socket.useItem(ITEM_HEALTH, roomName, $localStorage.guest_id);
  }

  function getBonusStat() {
    return this._bonusStat;
  }

  function fetchBonusStat() {
    return socket.fetchBonusStat($localStorage.guest_id)
      .then((response) => {
        if (response.status == 'success') {
          this._bonusStat = response.bonus_stat;
          this._bonusStat.gold_chest = Math.min(3, this._bonusStat.gold_chest);
        } else {
          // TODO
        }
      })
  }

  function openGoldChest() {
    return socket.openGoldChest($localStorage.guest_id)
      .then((response) => {
        if (response.status == 'success') {
          this._bonusStat.gold_chest = 0;

          return response.data;
        } else {
          // TODO
        }
      });
  }

  function openSilverChest() {
    return socket.openSilverChest($localStorage.guest_id)
      .then((response) => {
        if (response.status == 'success') {
          this._bonusStat.silver_chest = response.data.time;

          return response.data.bonus;
        } else {
          // TODO
        }
      });
  }

  function openWinChest() {
    return socket.openWinChest($localStorage.guest_id)
      .then((response) => {
      // return response.data;
        if (response.status == 'success') {
          return response.data;
        } else {
          // TODO
        }
      });
  }

  function onOpenBonus(item, quantity) {
    if (this._items[item] !== undefined) {
      this._items[item] += quantity;
    }
  }
}
