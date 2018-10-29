// YOUR CODE HERE
class LinkedList {
    constructor(){
        this.head=false;
        this.tail=false;
    };
    addToTail(arg){
        let newNode = new Node(arg);
        let oldTail = this.tail;

        if(!this.tail){
            this.tail=newNode;
            this.head=this.tail;
            this.tail.next=null;
        }
        else{
            oldTail.next=newNode;
            this.tail=newNode;
            this.tail.next=null;
            newNode.previous=oldTail;
        }
    };
    addToHead(arg){
        let newNode = new Node(arg);
        let oldHead = this.head;
        if(!this.head){
            this.head=newNode;
            this.tail=this.head;
            this.head.previous=null;
        }
        else{
            oldHead.previous=newNode;
            this.head=newNode;
            this.head.next=oldHead;
        }
    };
    removeHead(){
        if(this.head===null && this.tail=== null){
            return;
        }
       if(this.head===this.tail){
           let holder = this.head;
           this.head=null;
           this.tail=null;
           return holder['value'];
       }

        let currentHead = this.head;
        this.head=this.head.next;
        this.head.previous=null;
        return currentHead['value'];

    };
    removeTail(){
        if(this.head===this.tail){
            let holder= this.tail;
            this.tail=null;
            this.head=null;
            return holder['value'];
        }
        else{
            let currentTail = this.tail;
            this.tail=this.tail.previous;
            this.tail.next=null;
            return currentTail['value'];
        }

    };
    search(){

    }
};

class Node{
    constructor(arg){
        this.value=arg;
        this.next=null;
        this.previous=null;
    }
}