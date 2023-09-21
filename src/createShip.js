export function createShip (length) {
    return {
        length: length,
        hits: 0,
        shipId: null,

        hit() {
            this.hits ++;
        },
        isSunk() {
            if(this.length === this.hits) return true;
            return false
        }
    }
}
