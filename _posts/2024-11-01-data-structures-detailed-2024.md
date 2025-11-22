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
算法复杂度分析是评估算法效率的重要手段，主要包括时间复杂度和空间复杂度两个方面。

#### 1.3.1 时间复杂度表示法
时间复杂度是用来描述算法运行时间与输入规模之间关系的度量。我们通常使用大O记号（Big O Notation）来表示算法的最坏情况时间复杂度。

大O记号描述的是算法运行时间的增长率，而非精确的运行时间。它关注的是当输入规模趋向于无穷大时，算法运行时间的主导项。

除了大O记号之外，还有其他几种常用的复杂度表示法：
- **Ω记号（Big Omega Notation）**：表示算法最好情况下的时间复杂度，即算法运行时间的下界
- **Θ记号（Big Theta Notation）**：表示算法平均情况下的时间复杂度，即算法运行时间的紧确界

#### 1.3.2 常见时间复杂度详解

**O(1) - 常数时间复杂度**
这是最优的时间复杂度，表示算法的执行时间不随输入规模的变化而变化。无论处理多少数据，算法都能在相同的时间内完成。例如访问数组中的某个元素，只需要通过索引直接定位即可，不需要遍历整个数组。

**O(log n) - 对数时间复杂度**
这种复杂度常见于分治算法中，每次操作都能将问题规模减半。典型的例子是二分查找，每次比较都能排除一半的可能性。随着输入规模的增大，执行时间增长非常缓慢。

**O(n) - 线性时间复杂度**
算法的执行时间与输入规模成正比。需要遍历所有输入数据一次才能得到结果。例如查找数组中的最大值，需要遍历整个数组。

**O(n log n) - 线性对数时间复杂度**
这种复杂度常见于高效的排序算法中，如快速排序、归并排序和堆排序。它们通常采用分治策略，将问题分解为更小的子问题。

**O(n²) - 平方时间复杂度**
这类算法通常涉及嵌套循环，内外两层循环都需要遍历所有数据。典型的例子是冒泡排序和选择排序。当输入规模较大时，执行时间会急剧增长。

**O(2ⁿ) - 指数时间复杂度**
这类算法的执行时间随着输入规模呈指数级增长，常见于暴力搜索某些组合问题。即使是很小的输入规模，也可能导致无法接受的执行时间。

**O(n!) - 阶乘时间复杂度**
这是最糟糕的时间复杂度之一，常见于生成所有排列的问题。随着输入规模的增长，执行时间会迅速变得不可行。

#### 1.3.3 空间复杂度分析
空间复杂度是指算法在运行过程中临时占用存储空间大小的量度。同样使用大O记号来表示。

需要注意的是，空间复杂度通常不包括输入数据本身占用的空间，只计算算法运行过程中额外申请的空间。

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

## 6. 算法详解

### 6.1 排序算法

#### 6.1.1 冒泡排序（Bubble Sort）
冒泡排序是一种简单的排序算法，它重复地遍历要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。遍历数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。

```java
public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // 交换元素
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}
```

**时间复杂度：**
- 最好情况：O(n)（已经排序的情况）
- 平均情况：O(n²)
- 最坏情况：O(n²)（逆序排列）

**空间复杂度：** O(1)

#### 6.1.2 选择排序（Selection Sort）
选择排序是一种简单直观的排序算法。它的工作原理是每一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，直到全部待排序的数据元素排完。

```java
public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        
        // 选择排序的主要逻辑
        for (int i = 0; i < n - 1; i++) {
            // 找到最小元素的索引
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            
            // 交换找到的最小元素与第一个元素
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
}
```

**时间复杂度：**
- 最好情况：O(n²)
- 平均情况：O(n²)
- 最坏情况：O(n²)

**空间复杂度：** O(1)

#### 6.1.3 插入排序（Insertion Sort）
插入排序是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

```java
public class InsertionSort {
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; ++i) {
            int key = arr[i];
            int j = i - 1;
            
            // 将大于key的元素向后移动一位
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }
}
```

**时间复杂度：**
- 最好情况：O(n)（已经排序的情况）
- 平均情况：O(n²)
- 最坏情况：O(n²)（逆序排列）

**空间复杂度：** O(1)

#### 6.1.4 归并排序（Merge Sort）
归并排序是一种分治算法。它将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。

```java
public class MergeSort {
    public static void mergeSort(int[] arr, int l, int r) {
        if (l < r) {
            // 找到中点
            int m = (l + r) / 2;
            
            // 递归排序第一和第二部分
            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);
            
            // 合并已排序的部分
            merge(arr, l, m, r);
        }
    }
    
    public static void merge(int[] arr, int l, int m, int r) {
        // 找到两个子数组的大小
        int n1 = m - l + 1;
        int n2 = r - m;
        
        // 创建临时数组
        int[] L = new int[n1];
        int[] R = new int[n2];
        
        // 复制数据到临时数组
        for (int i = 0; i < n1; ++i)
            L[i] = arr[l + i];
        for (int j = 0; j < n2; ++j)
            R[j] = arr[m + 1 + j];
        
        // 合并临时数组回到arr[l..r]
        int i = 0, j = 0;
        int k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }
        
        // 复制L[]的剩余元素
        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }
        
        // 复制R[]的剩余元素
        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
    }
}
```

**时间复杂度：**
- 最好情况：O(n log n)
- 平均情况：O(n log n)
- 最坏情况：O(n log n)

**空间复杂度：** O(n)

#### 6.1.5 快速排序（Quick Sort）
快速排序是一种分治算法。它选择一个元素作为基准（pivot），将数组分为两部分，一部分小于基准，另一部分大于基准，然后递归地对这两部分进行排序。

```java
public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            // pi是分区索引，arr[pi]现在在正确位置
            int pi = partition(arr, low, high);
            
            // 分别对基准元素前后两部分进行排序
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    
    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1); // 较小元素的索引
        
        for (int j = low; j < high; j++) {
            // 如果当前元素小于或等于基准
            if (arr[j] <= pivot) {
                i++;
                
                // 交换arr[i]和arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        
        // 交换arr[i+1]和arr[high]（即基准元素）
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        
        return i + 1;
    }
}
```

**时间复杂度：**
- 最好情况：O(n log n)
- 平均情况：O(n log n)
- 最坏情况：O(n²)（每次选的基准都是最大或最小元素）

**空间复杂度：** O(log n)

#### 6.1.6 堆排序（Heap Sort）
堆排序是一种基于比较的排序算法，利用堆这种数据结构来设计算法。

```java
public class HeapSort {
    public static void heapSort(int[] arr) {
        int n = arr.length;
        
        // 构建最大堆（从最后一个非叶子节点开始）
        for (int i = n / 2 - 1; i >= 0; i--)
            heapify(arr, n, i);
        
        // 一个个从堆顶取出元素
        for (int i = n - 1; i > 0; i--) {
            // 将当前最大元素移到末尾
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            
            // 重新调整堆
            heapify(arr, i, 0);
        }
    }
    
    public static void heapify(int[] arr, int n, int i) {
        int largest = i; // 初始化最大为根节点
        int l = 2 * i + 1; // 左子节点
        int r = 2 * i + 2; // 右子节点
        
        // 如果左子节点大于根节点
        if (l < n && arr[l] > arr[largest])
            largest = l;
        
        // 如果右子节点大于目前的最大值
        if (r < n && arr[r] > arr[largest])
            largest = r;
        
        // 如果最大值不是根节点
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            
            // 递归地调整受影响的子树
            heapify(arr, n, largest);
        }
    }
}
```

**时间复杂度：**
- 最好情况：O(n log n)
- 平均情况：O(n log n)
- 最坏情况：O(n log n)

**空间复杂度：** O(1)

### 6.2 贪心算法（Greedy Algorithm）
贪心算法是一种在每一步选择中都采取在当前状态下最好或最优（即最有利）的选择，从而希望导致结果是最好或最优的算法。

#### 6.2.1 活动选择问题
活动选择问题是贪心算法的经典应用之一。给定n个活动，每个活动都有开始时间和结束时间，选择最多数量的活动，使得它们在时间上不冲突。

```java
import java.util.*;
public class ActivitySelection {
    // 表示活动的类
    static class Activity {
        int start, finish;
        
        public Activity(int start, int finish) {
            this.start = start;
            this.finish = finish;
        }
    }
    
    // 按照结束时间排序的比较器
    static class Compare implements Comparator<Activity> {
        public int compare(Activity s1, Activity s2) {
            return s1.finish - s2.finish;
        }
    }
    
    // 返回最大数量的不冲突活动
    public static void printMaxActivities(Activity[] activities) {
        // 按结束时间排序
        Arrays.sort(activities, new Compare());
        
        System.out.println("选择的活动:");
        
        // 第一个活动总是被选择
        int i = 0;
        System.out.println("(" + activities[i].start + ", " + activities[i].finish + ")");
        
        // 考虑其余活动
        for (int j = 1; j < activities.length; j++) {
            // 如果这个活动的开始时间大于等于前一个选定活动的结束时间，则选择它
            if (activities[j].start >= activities[i].finish) {
                System.out.println("(" + activities[j].start + ", " + activities[j].finish + ")");
                i = j;
            }
        }
    }
}
```

#### 6.2.2 分数背包问题
分数背包问题也是贪心算法的经典应用。与0/1背包问题不同，我们可以取物品的一部分。

```java
import java.util.*;
public class FractionalKnapsack {
    // 物品类
    static class Item {
        int value, weight;
        double ratio; // 价值密度
        
        public Item(int value, int weight) {
            this.value = value;
            this.weight = weight;
            this.ratio = (double) value / weight;
        }
    }
    
    // 按价值密度降序排序的比较器
    static class Compare implements Comparator<Item> {
        public int compare(Item a, Item b) {
            return Double.compare(b.ratio, a.ratio);
        }
    }
    
    // 返回最大价值
    public static double fractionalKnapsack(int W, Item[] items) {
        // 按价值密度排序
        Arrays.sort(items, new Compare());
        
        int curWeight = 0; // 当前重量
        double finalValue = 0.0; // 最终价值
        
        for (int i = 0; i < items.length; i++) {
            // 如果可以完全放入
            if (curWeight + items[i].weight <= W) {
                curWeight += items[i].weight;
                finalValue += items[i].value;
            } 
            // 如果只能放入一部分
            else {
                int remain = W - curWeight;
                finalValue += items[i].value * ((double) remain / items[i].weight);
                break;
            }
        }
        
        return finalValue;
    }
}
```

### 6.3 回溯算法（Backtracking）
回溯算法是一种通过探索所有可能的候选解来找出所有解的算法。如果候选解被确认不是一个解（或者至少不是最后一个解），回溯算法会通过在上一步进行一些变化来抛弃该解，即"回溯"并尝试其他可能。

#### 6.3.1 N皇后问题
N皇后问题是回溯算法的经典问题。目标是在N×N的棋盘上放置N个皇后，使得它们互不攻击。

```java
public class NQueens {
    final int N = 4;
    
    // 打印解决方案
    void printSolution(int board[][]) {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++)
                System.out.print(" " + board[i][j] + " ");
            System.out.println();
        }
    }
    
    // 检查是否可以在board[row][col]放置皇后
    boolean isSafe(int board[][], int row, int col) {
        int i, j;
        
        // 检查当前行左边是否有皇后
        for (i = 0; i < col; i++)
            if (board[row][i] == 1)
                return false;
        
        // 检查左上对角线是否有皇后
        for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
            if (board[i][j] == 1)
                return false;
        
        // 检查左下对角线是否有皇后
        for (i = row, j = col; j >= 0 && i < N; i++, j--)
            if (board[i][j] == 1)
                return false;
        
        return true;
    }
    
    // 使用回溯解决N皇后问题的主要函数
    boolean solveNQUtil(int board[][], int col) {
        // 如果所有皇后都被放置，则返回true
        if (col >= N)
            return true;
        
        // 考虑这一列中的每一行并尝试放置皇后
        for (int i = 0; i < N; i++) {
            // 检查是否可以放置皇后
            if (isSafe(board, i, col)) {
                // 放置皇后
                board[i][col] = 1;
                
                // 递归放置其余皇后
                if (solveNQUtil(board, col + 1) == true)
                    return true;
                
                // 如果放置皇后在board[i][col]不能导致解决方案，则移除皇后
                board[i][col] = 0;
            }
        }
        
        // 如果皇后不能放置在任何行中，则返回false
        return false;
    }
    
    // 解决N皇后问题
    boolean solveNQ() {
        int[][] board = new int[N][N];
        
        if (solveNQUtil(board, 0) == false) {
            System.out.print("Solution does not exist");
            return false;
        }
        
        printSolution(board);
        return true;
    }
}
```

#### 6.3.2 图的着色问题
图着色问题要求为图的所有顶点着色，使得相邻顶点的颜色不同，且使用的颜色数最少。

```java
public class GraphColoring {
    final int V = 4; // 顶点数
    
    // 打印解决方案
    void printSolution(int[] color) {
        System.out.println("解决方案: ");
        for (int i = 0; i < V; i++)
            System.out.println("顶点 " + i + " -> 颜色 " + color[i]);
    }
    
    // 检查分配给v的颜色是否与相邻顶点的颜色相同
    boolean isSafe(int v, int[][] graph, int[] color, int c) {
        for (int i = 0; i < V; i++)
            if (graph[v][i] == 1 && c == color[i])
                return false;
        return true;
    }
    
    // 图着色的主要递归函数
    boolean graphColoringUtil(int[][] graph, int m, int[] color, int v) {
        // 如果所有顶点都被着色，则返回true
        if (v == V)
            return true;
        
        // 尝试不同的颜色
        for (int c = 1; c <= m; c++) {
            // 检查是否可以分配颜色c到顶点v
            if (isSafe(v, graph, color, c)) {
                color[v] = c;
                
                // 递归为剩余顶点着色
                if (graphColoringUtil(graph, m, color, v + 1))
                    return true;
                
                // 如果给顶点v分配颜色c没有导致解决方案，则移除颜色
                color[v] = 0;
            }
        }
        
        // 如果不能为该顶点着色，则返回false
        return false;
    }
    
    // 图着色的主要函数
    boolean graphColoring(int[][] graph, int m) {
        int[] color = new int[V];
        
        // 调用递归辅助函数解决着色问题
        if (!graphColoringUtil(graph, m, color, 0)) {
            System.out.println("解决方案不存在");
            return false;
        }
        
        // 打印解决方案
        printSolution(color);
        return true;
    }
}
```

### 6.4 动态规划（Dynamic Programming）
动态规划是一种通过把原问题分解为相对简单的子问题的方式求解复杂问题的方法。动态规划常常适用于有重叠子问题和最优子结构性质的问题。

#### 6.4.1 斐波那契数列
斐波那契数列是动态规划的经典例子，用来演示重叠子问题的概念。

```java
public class Fibonacci {
    // 递归方法（效率低）
    public static int fibRecursive(int n) {
        if (n <= 1)
            return n;
        return fibRecursive(n - 1) + fibRecursive(n - 2);
    }
    
    // 动态规划方法（自底向上）
    public static int fibDP(int n) {
        if (n <= 1)
            return n;
        
        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = 1;
        
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
    }
    
    // 空间优化的动态规划方法
    public static int fibOptimized(int n) {
        if (n <= 1)
            return n;
        
        int prev2 = 0;
        int prev1 = 1;
        int current = 0;
        
        for (int i = 2; i <= n; i++) {
            current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        
        return current;
    }
}
```

#### 6.4.2 0/1背包问题
0/1背包问题是动态规划的经典应用之一。

```java
public class Knapsack {
    // 返回最大价值
    public static int knapSack(int W, int[] wt, int[] val, int n) {
        int[][] dp = new int[n + 1][W + 1];
        
        // 构建dp表
        for (int i = 0; i <= n; i++) {
            for (int w = 0; w <= W; w++) {
                if (i == 0 || w == 0)
                    dp[i][w] = 0;
                else if (wt[i - 1] <= w)
                    dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
                else
                    dp[i][w] = dp[i - 1][w];
            }
        }
        
        return dp[n][W];
    }
}
```

#### 6.4.3 最长公共子序列（LCS）
最长公共子序列问题是寻找两个序列共同拥有的最长子序列。

```java
public class LCS {
    // 返回最长公共子序列的长度
    public static int lcs(String X, String Y, int m, int n) {
        int[][] dp = new int[m + 1][n + 1];
        
        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= n; j++) {
                if (i == 0 || j == 0)
                    dp[i][j] = 0;
                else if (X.charAt(i - 1) == Y.charAt(j - 1))
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                else
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        
        return dp[m][n];
    }
    
    // 打印最长公共子序列
    public static void printLCS(String X, String Y, int m, int n) {
        int[][] dp = new int[m + 1][n + 1];
        
        // 构建dp表
        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= n; j++) {
                if (i == 0 || j == 0)
                    dp[i][j] = 0;
                else if (X.charAt(i - 1) == Y.charAt(j - 1))
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                else
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        
        // 通过dp表构造LCS
        int index = dp[m][n];
        char[] lcs = new char[index + 1];
        lcs[index] = '\0'; // 设置终止符
        
        int i = m, j = n;
        while (i > 0 && j > 0) {
            // 如果当前字符匹配
            if (X.charAt(i - 1) == Y.charAt(j - 1)) {
                lcs[index - 1] = X.charAt(i - 1); // 将字符放入结果中
                i--;
                j--;
                index--;
            }
            // 否则找出较大的值并向上或向左移动
            else if (dp[i - 1][j] > dp[i][j - 1])
                i--;
            else
                j--;
        }
        
        System.out.print("LCS of " + X + " and " + Y + " is ");
        for (int k = 0; k <= dp[m][n]; k++)
            System.out.print(lcs[k]);
    }
}
```

---

## 7. 高级数据结构简介

### 7.1 并查集（Disjoint Set）
用于处理不相交集合的合并及查询问题。

**操作：**
- find：查找元素所属集合
- union：合并两个集合

### 7.2 线段树（Segment Tree）
用于处理区间查询问题的数据结构。

**特点：**
- 建立时间复杂度：O(n)
- 查询时间复杂度：O(log n)
- 更新时间复杂度：O(log n)

### 7.3 字典树（Trie）
用于高效存储和查找字符串集合的数据结构。

**应用场景：**
- 自动补全
- 拼写检查
- IP路由

### 7.4 跳表（Skip List）
一种概率性数据结构，可以在O(log n)时间内完成查找、插入和删除操作。

---

## 8. 数据结构选择与应用实践

### 8.1 如何选择合适的数据结构
1. **考虑操作频率**：哪些操作最频繁？
2. **考虑时间复杂度**：各项操作的时间要求是什么？
3. **考虑空间复杂度**：内存使用限制如何？
4. **考虑实现难度**：团队的技术水平能否支撑？

### 8.2 实际应用场景
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