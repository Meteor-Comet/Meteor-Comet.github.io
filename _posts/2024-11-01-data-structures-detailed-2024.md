---
layout: post
title: "数据结构详解"
subtitle: "数据结构 / 算法 / 编程基础 / 计算机科学"
date: 2024-11-01 12:00:00
author: "Comet"
catalog: true
tags:
    - 数据结构
    - 算法
    - 编程基础
    - 计算机科学
    - 学习日志
---

## 学习目标
- 理解各种基本数据结构的概念和特点
- 掌握常见数据结构的实现方式
- 学会在实际编程中选择合适的数据结构
- 理解时间和空间复杂度分析
- 掌握数据结构在算法设计中的应用

## 学习计划
1. 数据结构概述与复杂度分析
2. 线性结构：数组、链表、栈、队列
3. 树形结构：二叉树、平衡树、堆
4. 图结构：表示方法与遍历算法
5. 哈希表与散列算法
6. 高级数据结构简介
7. 数据结构选择与应用实践

---

## 1. 数据结构概述

### 1.1 什么是数据结构
数据结构是计算机中组织和存储数据的方式，它使得数据可以高效地被访问和修改。更确切地说，数据结构是数据值的集合、数据之间的关系以及对数据进行的操作。

### 1.2 数据结构的分类
数据结构主要分为以下几类：
- **线性结构**：数据元素之间存在一对一的线性关系
- **树形结构**：数据元素之间存在一对多的层次关系
- **图形结构**：数据元素之间存在多对多的任意关系

### 1.3 算法复杂度分析
- **时间复杂度**：衡量算法执行时间随输入规模增长的变化趋势
- **空间复杂度**：衡量算法所需存储空间随输入规模增长的变化趋势

#### 1.3.1 时间复杂度表示法
- **大O记号（Big O Notation）**：表示算法最坏情况下的时间复杂度
- **Ω记号（Big Omega Notation）**：表示算法最好情况下的时间复杂度
- **Θ记号（Big Theta Notation）**：表示算法平均情况下的时间复杂度

#### 1.3.2 常见时间复杂度
| 复杂度 | 名称 | 示例 |
|--------|------|------|
| O(1) | 常数时间 | 访问数组元素 |
| O(log n) | 对数时间 | 二分查找 |
| O(n) | 线性时间 | 遍历数组 |
| O(n log n) | 线性对数时间 | 快速排序平均情况 |
| O(n²) | 平方时间 | 冒泡排序 |
| O(2ⁿ) | 指数时间 | 求解旅行商问题 |

---

## 2. 线性结构

### 2.1 数组（Array）
数组是最基本的数据结构，用于存储相同类型的元素。

**特点：**
- 元素在内存中连续存储
- 支持随机访问，通过索引直接定位元素
- 大小固定

**Java实现：**
```java
public class MyArray {
    private int[] array;
    private int size;
    
    public MyArray(int capacity) {
        this.array = new int[capacity];
        this.size = 0;
    }
    
    // 插入元素到末尾
    public void insert(int element) {
        if (size >= array.length) {
            throw new RuntimeException("数组已满");
        }
        array[size++] = element;
    }
    
    // 根据索引删除元素
    public int delete(int index) {
        if (index < 0 || index >= size) {
            throw new RuntimeException("索引越界");
        }
        int deletedElement = array[index];
        // 将删除位置后的元素前移
        for (int i = index; i < size - 1; i++) {
            array[i] = array[i + 1];
        }
        size--;
        return deletedElement;
    }
    
    // 根据索引查找元素
    public int get(int index) {
        if (index < 0 || index >= size) {
            throw new RuntimeException("索引越界");
        }
        return array[index];
    }
    
    // 打印数组
    public void display() {
        System.out.print("[");
        for (int i = 0; i < size; i++) {
            System.out.print(array[i]);
            if (i < size - 1) {
                System.out.print(", ");
            }
        }
        System.out.println("]");
    }
}
```

**时间复杂度：**
- 访问：O(1)
- 搜索：O(n)
- 插入：O(n)
- 删除：O(n)

**空间复杂度：** O(n)

### 2.2 链表（Linked List）
链表是由节点组成的线性数据结构，每个节点包含数据和指向下一个节点的指针。

**特点：**
- 元素在内存中非连续存储
- 不支持随机访问
- 大小动态变化

**Java实现（单向链表）：**
```java
public class ListNode {
    int val;
    ListNode next;
    
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

public class MyLinkedList {
    private ListNode head;
    private int size;
    
    public MyLinkedList() {
        this.head = null;
        this.size = 0;
    }
    
    // 在头部插入元素
    public void insertFirst(int val) {
        ListNode newNode = new ListNode(val);
        newNode.next = head;
        head = newNode;
        size++;
    }
    
    // 在尾部插入元素
    public void insertLast(int val) {
        ListNode newNode = new ListNode(val);
        if (head == null) {
            head = newNode;
        } else {
            ListNode current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
        size++;
    }
    
    // 删除第一个元素
    public int deleteFirst() {
        if (head == null) {
            throw new RuntimeException("链表为空");
        }
        int deletedVal = head.val;
        head = head.next;
        size--;
        return deletedVal;
    }
    
    // 根据索引查找元素
    public int get(int index) {
        if (index < 0 || index >= size) {
            throw new RuntimeException("索引越界");
        }
        ListNode current = head;
        for (int i = 0; i < index; i++) {
            current = current.next;
        }
        return current.val;
    }
    
    // 打印链表
    public void display() {
        ListNode current = head;
        System.out.print("[");
        while (current != null) {
            System.out.print(current.val);
            if (current.next != null) {
                System.out.print(", ");
            }
            current = current.next;
        }
        System.out.println("]");
    }
}
```

**类型：**
- 单向链表
- 双向链表
- 循环链表

**时间复杂度：**
- 访问：O(n)
- 搜索：O(n)
- 插入：O(1)
- 删除：O(1)

**空间复杂度：** O(n)

### 2.3 栈（Stack）
栈是一种后进先出（LIFO）的数据结构。

**基本操作：**
- push：入栈
- pop：出栈
- peek/top：查看栈顶元素
- isEmpty：检查栈是否为空

**Java实现（基于数组）：**
```java
public class MyStack {
    private int[] stack;
    private int top;
    private int capacity;
    
    public MyStack(int capacity) {
        this.capacity = capacity;
        this.stack = new int[capacity];
        this.top = -1;
    }
    
    // 入栈
    public void push(int item) {
        if (isFull()) {
            throw new RuntimeException("栈已满");
        }
        stack[++top] = item;
    }
    
    // 出栈
    public int pop() {
        if (isEmpty()) {
            throw new RuntimeException("栈为空");
        }
        return stack[top--];
    }
    
    // 查看栈顶元素
    public int peek() {
        if (isEmpty()) {
            throw new RuntimeException("栈为空");
        }
        return stack[top];
    }
    
    // 检查栈是否为空
    public boolean isEmpty() {
        return top == -1;
    }
    
    // 检查栈是否已满
    public boolean isFull() {
        return top == capacity - 1;
    }
}
```

**应用场景：**
- 函数调用栈
- 表达式求值
- 括号匹配
- 浏览器历史记录

**时间复杂度：**
- push：O(1)
- pop：O(1)
- peek：O(1)
- isEmpty：O(1)

**空间复杂度：** O(n)

### 2.4 队列（Queue）
队列是一种先进先出（FIFO）的数据结构。

**基本操作：**
- enqueue：入队
- dequeue：出队
- front：查看队首元素
- rear：查看队尾元素
- isEmpty：检查队列是否为空

**Java实现（基于数组）：**
```java
public class MyQueue {
    private int[] queue;
    private int front;
    private int rear;
    private int size;
    private int capacity;
    
    public MyQueue(int capacity) {
        this.capacity = capacity;
        this.queue = new int[capacity];
        this.front = 0;
        this.rear = -1;
        this.size = 0;
    }
    
    // 入队
    public void enqueue(int item) {
        if (isFull()) {
            throw new RuntimeException("队列已满");
        }
        rear = (rear + 1) % capacity;
        queue[rear] = item;
        size++;
    }
    
    // 出队
    public int dequeue() {
        if (isEmpty()) {
            throw new RuntimeException("队列为空");
        }
        int item = queue[front];
        front = (front + 1) % capacity;
        size--;
        return item;
    }
    
    // 查看队首元素
    public int front() {
        if (isEmpty()) {
            throw new RuntimeException("队列为空");
        }
        return queue[front];
    }
    
    // 查看队尾元素
    public int rear() {
        if (isEmpty()) {
            throw new RuntimeException("队列为空");
        }
        return queue[rear];
    }
    
    // 检查队列是否为空
    public boolean isEmpty() {
        return size == 0;
    }
    
    // 检查队列是否已满
    public boolean isFull() {
        return size == capacity;
    }
}
```

**变种：**
- 双端队列（Deque）
- 优先队列（Priority Queue）

**时间复杂度：**
- enqueue：O(1)
- dequeue：O(1)
- front：O(1)
- rear：O(1)

**空间复杂度：** O(n)

---

## 3. 树形结构

### 3.1 二叉树（Binary Tree）
二叉树是每个节点最多有两个子树的树结构，子树有左右之分。

**性质：**
- 第i层最多有2^(i-1)个节点
- 深度为k的二叉树最多有2^k-1个节点

**Java实现：**
```java
public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class BinaryTree {
    TreeNode root;
    
    public BinaryTree() {
        this.root = null;
    }
    
    // 前序遍历（递归）
    public void preorderTraversal(TreeNode node) {
        if (node != null) {
            System.out.print(node.val + " ");
            preorderTraversal(node.left);
            preorderTraversal(node.right);
        }
    }
    
    // 中序遍历（递归）
    public void inorderTraversal(TreeNode node) {
        if (node != null) {
            inorderTraversal(node.left);
            System.out.print(node.val + " ");
            inorderTraversal(node.right);
        }
    }
    
    // 后序遍历（递归）
    public void postorderTraversal(TreeNode node) {
        if (node != null) {
            postorderTraversal(node.left);
            postorderTraversal(node.right);
            System.out.print(node.val + " ");
        }
    }
}
```

**遍历方式：**
- 前序遍历（根-左-右）
- 中序遍历（左-根-右）
- 后序遍历（左-右-根）
- 层序遍历（广度优先）

### 3.2 二叉搜索树（BST）
二叉搜索树是一种特殊的二叉树，满足以下性质：
- 左子树所有节点的值小于根节点的值
- 右子树所有节点的值大于根节点的值
- 左右子树也分别为二叉搜索树

**Java实现：**
```java
public class BST {
    class Node {
        int key;
        Node left, right;
        
        public Node(int item) {
            key = item;
            left = right = null;
        }
    }
    
    Node root;
    
    public BST() {
        root = null;
    }
    
    // 插入节点
    public void insert(int key) {
        root = insertRec(root, key);
    }
    
    private Node insertRec(Node root, int key) {
        if (root == null) {
            root = new Node(key);
            return root;
        }
        
        if (key < root.key)
            root.left = insertRec(root.left, key);
        else if (key > root.key)
            root.right = insertRec(root.right, key);
        
        return root;
    }
    
    // 搜索节点
    public boolean search(int key) {
        return searchRec(root, key);
    }
    
    private boolean searchRec(Node root, int key) {
        if (root == null)
            return false;
        
        if (root.key == key)
            return true;
        
        if (key < root.key)
            return searchRec(root.left, key);
        
        return searchRec(root.right, key);
    }
    
    // 删除节点
    public void deleteKey(int key) {
        root = deleteRec(root, key);
    }
    
    private Node deleteRec(Node root, int key) {
        if (root == null)
            return root;
        
        if (key < root.key)
            root.left = deleteRec(root.left, key);
        else if (key > root.key)
            root.right = deleteRec(root.right, key);
        else {
            // 节点只有一个子节点或没有子节点
            if (root.left == null)
                return root.right;
            else if (root.right == null)
                return root.left;
            
            // 节点有两个子节点，获取中序后继（右子树中的最小值）
            root.key = minValue(root.right);
            
            // 删除中序后继
            root.right = deleteRec(root.right, root.key);
        }
        
        return root;
    }
    
    private int minValue(Node root) {
        int minv = root.key;
        while (root.left != null) {
            minv = root.left.key;
            root = root.left;
        }
        return minv;
    }
}
```

**时间复杂度：**
- 平均情况：O(log n)
- 最坏情况：O(n)（退化为链表）

**空间复杂度：** O(n)

### 3.3 树的旋转操作
树的旋转是在保持二叉搜索树性质的前提下，重新组织树结构的操作，主要用于平衡树。

#### 3.3.1 右旋转（Right Rotation）
```java
public TreeNode rightRotate(TreeNode y) {
    TreeNode x = y.left;
    TreeNode T2 = x.right;
    
    // 执行旋转
    x.right = y;
    y.left = T2;
    
    // 返回新的根节点
    return x;
}
```

#### 3.3.2 左旋转（Left Rotation）
```java
public TreeNode leftRotate(TreeNode x) {
    TreeNode y = x.right;
    TreeNode T2 = y.left;
    
    // 执行旋转
    y.left = x;
    x.right = T2;
    
    // 返回新的根节点
    return y;
}
```

### 3.4 AVL树
AVL树是高度平衡的二叉搜索树，任何节点的两个子树的高度差不超过1。

**Java实现：**
```java
public class AVLTree {
    class Node {
        int key, height;
        Node left, right;
        
        Node(int d) {
            key = d;
            height = 1;
        }
    }
    
    Node root;
    
    // 获取节点高度
    int height(Node N) {
        if (N == null)
            return 0;
        return N.height;
    }
    
    // 右旋转
    Node rightRotate(Node y) {
        Node x = y.left;
        Node T2 = x.right;
        
        // 执行旋转
        x.right = y;
        y.left = T2;
        
        // 更新高度
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        
        // 返回新的根
        return x;
    }
    
    // 左旋转
    Node leftRotate(Node x) {
        Node y = x.right;
        Node T2 = y.left;
        
        // 执行旋转
        y.left = x;
        x.right = T2;
        
        // 更新高度
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        
        // 返回新的根
        return y;
    }
    
    // 获取平衡因子
    int getBalance(Node N) {
        if (N == null)
            return 0;
        return height(N.left) - height(N.right);
    }
    
    // 插入节点
    Node insert(Node node, int key) {
        // 1. 执行正常的BST插入
        if (node == null)
            return (new Node(key));
        
        if (key < node.key)
            node.left = insert(node.left, key);
        else if (key > node.key)
            node.right = insert(node.right, key);
        else // 相等的键不允许
            return node;
        
        // 2. 更新祖先节点的高度
        node.height = 1 + Math.max(height(node.left),
                                  height(node.right));
        
        // 3. 获取平衡因子
        int balance = getBalance(node);
        
        // 如果节点变得不平衡，则有4种情况
        
        // 左左情况
        if (balance > 1 && key < node.left.key)
            return rightRotate(node);
        
        // 右右情况
        if (balance < -1 && key > node.right.key)
            return leftRotate(node);
        
        // 左右情况
        if (balance > 1 && key > node.left.key) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
        
        // 右左情况
        if (balance < -1 && key < node.right.key) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        
        // 返回未改变的节点指针
        return node;
    }
}
```

### 3.5 红黑树（Red-Black Tree）
红黑树是一种自平衡的二叉搜索树，通过给每个节点着色（红色或黑色）并在插入和删除操作时维持特定的性质来保证平衡。

**红黑树的性质：**
1. 每个节点要么是红色，要么是黑色
2. 根节点是黑色
3. 所有叶子节点（NIL节点）都是黑色
4. 如果一个节点是红色，则它的两个子节点都是黑色（即不能有连续的红色节点）
5. 从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点

**Java实现（简化版）：**
```java
public class RedBlackTree {
    private final int RED = 0;
    private final int BLACK = 1;
    
    class Node {
        int data;
        int color;
        Node left;
        Node right;
        Node parent;
        boolean isNullNode;
        
        Node(int data) {
            this.data = data;
            this.color = RED; // 新节点默认为红色
            this.isNullNode = false;
        }
        
        Node() {
            this.isNullNode = true;
        }
    }
    
    private Node root;
    private Node nil; // 哨兵节点，代表所有的叶子节点
    
    public RedBlackTree() {
        nil = new Node();
        nil.color = BLACK;
        root = nil;
    }
    
    // 左旋转
    private void leftRotate(Node x) {
        Node y = x.right;
        x.right = y.left;
        
        if (!y.left.isNullNode) {
            y.left.parent = x;
        }
        
        y.parent = x.parent;
        
        if (x.parent.isNullNode) {
            root = y;
        } else if (x == x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }
        
        y.left = x;
        x.parent = y;
    }
    
    // 右旋转
    private void rightRotate(Node y) {
        Node x = y.left;
        y.left = x.right;
        
        if (!x.right.isNullNode) {
            x.right.parent = y;
        }
        
        x.parent = y.parent;
        
        if (y.parent.isNullNode) {
            root = x;
        } else if (y == y.parent.right) {
            y.parent.right = x;
        } else {
            y.parent.left = x;
        }
        
        x.right = y;
        y.parent = x;
    }
    
    // 插入修复
    private void insertFixup(Node z) {
        while (z.parent.color == RED) {
            if (z.parent == z.parent.parent.left) {
                Node y = z.parent.parent.right;
                if (y.color == RED) {
                    // 情况1：叔叔节点是红色
                    z.parent.color = BLACK;
                    y.color = BLACK;
                    z.parent.parent.color = RED;
                    z = z.parent.parent;
                } else {
                    if (z == z.parent.right) {
                        // 情况2：叔叔节点是黑色，z是右孩子
                        z = z.parent;
                        leftRotate(z);
                    }
                    // 情况3：叔叔节点是黑色，z是左孩子
                    z.parent.color = BLACK;
                    z.parent.parent.color = RED;
                    rightRotate(z.parent.parent);
                }
            } else {
                Node y = z.parent.parent.left;
                if (y.color == RED) {
                    // 情况1：叔叔节点是红色
                    z.parent.color = BLACK;
                    y.color = BLACK;
                    z.parent.parent.color = RED;
                    z = z.parent.parent;
                } else {
                    if (z == z.parent.left) {
                        // 情况2：叔叔节点是黑色，z是左孩子
                        z = z.parent;
                        rightRotate(z);
                    }
                    // 情况3：叔叔节点是黑色，z是右孩子
                    z.parent.color = BLACK;
                    z.parent.parent.color = RED;
                    leftRotate(z.parent.parent);
                }
            }
        }
        root.color = BLACK;
    }
    
    // 插入节点
    public void insert(int data) {
        Node z = new Node(data);
        z.left = nil;
        z.right = nil;
        
        Node y = nil;
        Node x = root;
        
        // 找到插入位置
        while (!x.isNullNode) {
            y = x;
            if (z.data < x.data) {
                x = x.left;
            } else {
                x = x.right;
            }
        }
        
        z.parent = y;
        
        if (y.isNullNode) {
            root = z;
        } else if (z.data < y.data) {
            y.left = z;
        } else {
            y.right = z;
        }
        
        // 修复红黑树性质
        insertFixup(z);
    }
}
```

**时间复杂度：**
- 搜索：O(log n)
- 插入：O(log n)
- 删除：O(log n)

**空间复杂度：** O(n)

### 3.6 堆（Heap）
堆是一种特殊的完全二叉树，分为最大堆和最小堆。

**性质：**
- 最大堆：父节点的值总是大于或等于其子节点的值
- 最小堆：父节点的值总是小于或等于其子节点的值

**Java实现（最小堆）：**
```java
public class MinHeap {
    private int[] heap;
    private int size;
    private int maxSize;
    
    public MinHeap(int maxSize) {
        this.maxSize = maxSize;
        this.size = 0;
        heap = new int[this.maxSize + 1];
        heap[0] = Integer.MIN_VALUE;
    }
    
    // 获取父节点索引
    private int parent(int pos) {
        return pos / 2;
    }
    
    // 获取左子节点索引
    private int leftChild(int pos) {
        return (2 * pos);
    }
    
    // 获取右子节点索引
    private int rightChild(int pos) {
        return (2 * pos) + 1;
    }
    
    // 检查是否为叶子节点
    private boolean isLeaf(int pos) {
        return pos >= (size / 2) && pos <= size;
    }
    
    // 交换两个节点
    private void swap(int fpos, int spos) {
        int tmp = heap[fpos];
        heap[fpos] = heap[spos];
        heap[spos] = tmp;
    }
    
    // 堆化操作（向下调整）
    private void minHeapify(int pos) {
        if (!isLeaf(pos)) {
            // 如果不是叶子节点且大于任一子节点
            if (heap[pos] > heap[leftChild(pos)] || 
                heap[pos] > heap[rightChild(pos)]) {
                
                // 与较小的子节点交换
                if (heap[leftChild(pos)] < heap[rightChild(pos)]) {
                    swap(pos, leftChild(pos));
                    minHeapify(leftChild(pos));
                } else {
                    swap(pos, rightChild(pos));
                    minHeapify(rightChild(pos));
                }
            }
        }
    }
    
    // 插入元素
    public void insert(int element) {
        if (size >= maxSize) {
            return;
        }
        heap[++size] = element;
        int current = size;
        
        // 向上调整
        while (heap[current] < heap[parent(current)]) {
            swap(current, parent(current));
            current = parent(current);
        }
    }
    
    // 移除最小元素
    public int remove() {
        int popped = heap[1];
        heap[1] = heap[size--];
        minHeapify(1);
        return popped;
    }
    
    // 构建堆
    public void minHeap() {
        for (int pos = (size / 2); pos >= 1; pos--) {
            minHeapify(pos);
        }
    }
}
```

**应用场景：**
- 堆排序
- 优先队列
- Top K问题

**时间复杂度：**
- 插入：O(log n)
- 删除最小元素：O(log n)
- 获取最小元素：O(1)

**空间复杂度：** O(n)

---

## 4. 图结构

### 4.1 图的表示
图是由节点（顶点）和边组成的非线性数据结构。

**表示方法：**
- 邻接矩阵
- 邻接表
- 边列表

**Java实现（邻接表）：**
```java
import java.util.*;
public class Graph {
    private int numVertices;
    private List<List<Integer>> adjLists;
    private boolean directed;
    
    Graph(int vertices, boolean directed) {
        this.numVertices = vertices;
        this.directed = directed;
        adjLists = new ArrayList<>();
        for (int i = 0; i < vertices; i++) {
            adjLists.add(new LinkedList<>());
        }
    }
    
    // 添加边
    void addEdge(int src, int dest) {
        adjLists.get(src).add(dest);
        if (!directed) {
            adjLists.get(dest).add(src);
        }
    }
    
    // 打印图
    void printGraph() {
        for (int v = 0; v < numVertices; v++) {
            System.out.println("顶点 " + v + ":");
            for (Integer p : adjLists.get(v)) {
                System.out.print(" -> " + p);
            }
            System.out.println();
        }
    }
}
```

### 4.2 图的遍历
- **深度优先搜索（DFS）**：类似于树的前序遍历
- **广度优先搜索（BFS）**：类似于树的层序遍历

**Java实现（DFS和BFS）：**
```java
import java.util.*;

public class GraphTraversal {
    private int numVertices;
    private List<List<Integer>> adjLists;
    
    GraphTraversal(int vertices) {
        this.numVertices = vertices;
        adjLists = new ArrayList<>();
        for (int i = 0; i < vertices; i++) {
            adjLists.add(new LinkedList<>());
        }
    }
    
    void addEdge(int src, int dest) {
        adjLists.get(src).add(dest);
        adjLists.get(dest).add(src);
    }
    
    // 深度优先搜索
    void DFSUtil(int vertex, boolean[] visited) {
        visited[vertex] = true;
        System.out.print(vertex + " ");
        
        Iterator<Integer> ite = adjLists.get(vertex).iterator();
        while (ite.hasNext()) {
            int adj = ite.next();
            if (!visited[adj])
                DFSUtil(adj, visited);
        }
    }
    
    void DFS(int vertex) {
        boolean[] visited = new boolean[numVertices];
        DFSUtil(vertex, visited);
    }
    
    // 广度优先搜索
    void BFS(int vertex) {
        boolean[] visited = new boolean[numVertices];
        Queue<Integer> queue = new LinkedList<>();
        
        visited[vertex] = true;
        queue.add(vertex);
        
        while (!queue.isEmpty()) {
            int s = queue.poll();
            System.out.print(s + " ");
            
            Iterator<Integer> ite = adjLists.get(s).listIterator();
            while (ite.hasNext()) {
                int adj = ite.next();
                if (!visited[adj]) {
                    visited[adj] = true;
                    queue.add(adj);
                }
            }
        }
    }
}
```

### 4.3 最短路径算法
- Dijkstra算法
- Floyd-Warshall算法
- Bellman-Ford算法

### 4.4 最小生成树
- Prim算法
- Kruskal算法

---

## 5. 哈希表

### 5.1 哈希函数
哈希函数是将输入（键）映射到固定范围输出的函数。

**常见哈希函数：**
- 除法哈希法
- 乘法哈希法
- 全域哈希法

### 5.2 冲突解决
当不同键映射到同一位置时发生冲突。

**解决方案：**
- 链地址法（拉链法）
- 开放寻址法
  - 线性探测
  - 二次探测
  - 双重哈希

**Java实现（链地址法）：**
```java
import java.util.ArrayList;

public class HashTable<K, V> {
    private class Entry<K, V> {
        K key;
        V value;
        Entry<K, V> next;
        
        public Entry(K key, V value) {
            this.key = key;
            this.value = value;
            this.next = null;
        }
    }
    
    private int size;
    private ArrayList<Entry<K, V>> bucketArray;
    
    public HashTable() {
        bucketArray = new ArrayList<>();
        size = 0;
        
        // 创建空桶
        for (int i = 0; i < 10; i++) {
            bucketArray.add(null);
        }
    }
    
    public int getSize() {
        return size;
    }
    
    public boolean isEmpty() {
        return getSize() == 0;
    }
    
    // 哈希函数
    private int getBucketIndex(K key) {
        int hashCode = key.hashCode();
        int index = hashCode % bucketArray.size();
        return index < 0 ? index * -1 : index;
    }
    
    // 添加键值对
    public void put(K key, V value) {
        int bucketIndex = getBucketIndex(key);
        Entry<K, V> head = bucketArray.get(bucketIndex);
        
        // 检查键是否已存在
        while (head != null) {
            if (head.key.equals(key)) {
                head.value = value;
                return;
            }
            head = head.next;
        }
        
        // 插入新节点在链表头部
        size++;
        head = bucketArray.get(bucketIndex);
        Entry<K, V> newNode = new Entry<>(key, value);
        newNode.next = head;
        bucketArray.set(bucketIndex, newNode);
        
        // 如果负载因子超过阈值，则扩容
        if ((1.0 * size) / bucketArray.size() >= 0.7) {
            ArrayList<Entry<K, V>> temp = bucketArray;
            bucketArray = new ArrayList<>();
            size = 0;
            for (int i = 0; i < 2 * temp.size(); i++) {
                bucketArray.add(null);
            }
            
            for (Entry<K, V> headNode : temp) {
                while (headNode != null) {
                    put(headNode.key, headNode.value);
                    headNode = headNode.next;
                }
            }
        }
    }
    
    // 获取值
    public V get(K key) {
        int bucketIndex = getBucketIndex(key);
        Entry<K, V> head = bucketArray.get(bucketIndex);
        
        // 搜索键在链表中
        while (head != null) {
            if (head.key.equals(key)) {
                return head.value;
            }
            head = head.next;
        }
        
        // 如果找不到键
        return null;
    }
    
    // 删除键值对
    public V remove(K key) {
        int bucketIndex = getBucketIndex(key);
        
        Entry<K, V> head = bucketArray.get(bucketIndex);
        
        Entry<K, V> prev = null;
        while (head != null) {
            if (head.key.equals(key))
                break;
            
            prev = head;
            head = head.next;
        }
        
        if (head == null)
            return null;
        
        size--;
        
        if (prev != null)
            prev.next = head.next;
        else
            bucketArray.set(bucketIndex, head.next);
        
        return head.value;
    }
}
```

**时间复杂度：**
- 平均情况：O(1)
- 最坏情况：O(n)

**空间复杂度：** O(n)

---

## 6. 高级数据结构简介

### 6.1 并查集（Disjoint Set）
用于处理不相交集合的合并及查询问题。

**操作：**
- find：查找元素所属集合
- union：合并两个集合

### 6.2 线段树（Segment Tree）
用于处理区间查询问题的数据结构。

**特点：**
- 建立时间复杂度：O(n)
- 查询时间复杂度：O(log n)
- 更新时间复杂度：O(log n)

### 6.3 字典树（Trie）
用于高效存储和查找字符串集合的数据结构。

**应用场景：**
- 自动补全
- 拼写检查
- IP路由

### 6.4 跳表（Skip List）
一种概率性数据结构，可以在O(log n)时间内完成查找、插入和删除操作。

---

## 7. 数据结构选择与应用实践

### 7.1 如何选择合适的数据结构
1. **考虑操作频率**：哪些操作最频繁？
2. **考虑时间复杂度**：各项操作的时间要求是什么？
3. **考虑空间复杂度**：内存使用限制如何？
4. **考虑实现难度**：团队的技术水平能否支撑？

### 7.2 实际应用场景
- **缓存系统**：哈希表 + 双向链表（LRU Cache）
- **搜索引擎**：倒排索引（哈希表 + 链表）
- **社交网络**：图结构
- **游戏开发**：四叉树/八叉树用于碰撞检测
- **编译器**：栈用于语法分析

---

## 总结

### 核心要点
- 数据结构是算法设计的基础，选择合适的数据结构能显著提升程序性能
- 理解各种数据结构的特点和适用场景对于软件开发至关重要
- 复杂度分析是评估数据结构性能的重要工具
- 实际应用中往往需要组合多种数据结构解决问题

### 学习建议
1. **理论与实践结合**：不仅要理解概念，还要动手实现
2. **多做练习题**：通过算法题加深对数据结构的理解
3. **阅读优秀源码**：学习开源项目中数据结构的应用
4. **关注实际应用**：了解各种数据结构在工业界的应用场景

---

## 参考资料
- 《算法导论》
- 《数据结构与算法分析》
- LeetCode算法题解
- GeeksforGeeks数据结构教程
- 各大厂技术博客