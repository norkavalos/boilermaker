// YOUR CODE HERE
class LinkedList {
    constructor(head ,tail){
        this.head= false;
        this.tail= false;
    };
    addToTail(arg){
    let newNode = new Node(arg);
    if (!this.tail){
        this.tail = newNode;
        this.head = this.tail;
    } else {
        let oldTail = this.tail;
        oldTail.next = newNode;
        this.tail.previous = oldTail;
    }

    };
    addToHead(arg){
    let newNode = new Node(arg);
    if (!this.head){

    }

    };
    removeHead(arg){
        this.head = this.next;
        return this.head
    };
    removeTail(){

    };
    search(){

    }
};

class Node{
    constructor(arg){
        this.value = arg;
        this.next = null;
        this.previous = null;
    }
}
