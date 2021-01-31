class PriorityQueue {
    queue = [];
    size = 0;

    add(v, w) {
        this.queue.push({vertex: v, weight: w});
        this.siftUp();
        this.size++;
    }

    siftUp() {
        let i = this.queue.length - 1;

        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (this.queue[i].weight < this.queue[parent].weight) {
                this.swap(i, parent);
            } else {
                break;
            }

            i = parent;
        }
    }

    swap(i, j) {
        const temp = this.queue[i];
        this.queue[i] = this.queue[j];
        this.queue[j] = temp;
    }

    remove() {
        const item = this.queue[0];
        this.swap(0, this.queue.length - 1);
        this.queue.pop();
        this.siftDown();
        this.size--;

        return item;
    }

    siftDown() {
        let i = 0;

        while (i * 2 + 1 < this.queue.length) {
            let child = i * 2 + 1;

            if (child + 1 < this.queue.length && this.queue[child].weight > this.queue[child + 1].weight) {
                child++;
            }

            if (this.queue[i].weight > this.queue[child].weight) {
                this.swap(i, child);
            } else {
                break;
            }
            
            i = child;
        }
    }

    reset() {
        this.queue = [];
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;
    }

    getSize() {
        return this.size;
    }
}

export default new PriorityQueue();