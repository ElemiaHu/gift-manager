const uuid = require('uuid').v4;

function makeGiftList() {
    const giftList = {};
    const gifts = {};

    giftList.contains = function contains(id) {
        return !!gifts[id];
    }

    giftList.addGift = function addGift(gift) {
        const id = uuid();

        gifts[id] = {
            id,
            gift,
            // dog is not a valid user, so claimedBy is default to dog
            claimedBy: 'dog',
        };

        return id;
    }

    giftList.getGift = function getGift(id) {
        return gifts[id];
    }

    giftList.getAllGifts = function getAllGifts() {
        return gifts;
    }

    giftList.deleteGift = function deleteGift(id) {
        delete gifts[id];
    }

    giftList.updateGiftContent = function updateGiftContent(id, newGift) {
        gifts[id].gift = newGift;
    }

    giftList.claim = function claim(username, id) {
        if(gifts[id].claimedBy === 'dog') {
            gifts[id].claimedBy = username;
            return true;
        } else if(gifts[id].claimedBy === username) {
            gifts[id].claimedBy = 'dog';
            return true;
        }
        return false;
    }

    giftList.getClaimed = function getClaimed(id) {
        return gifts[id].claimedBy;
    }

    return giftList;
}

module.exports = {
    makeGiftList,
}