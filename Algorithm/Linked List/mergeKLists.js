// Merge k Sorted Lists
/**
 * You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

 

Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
Example 2:

Input: lists = []
Output: []
Example 3:

Input: lists = [[]]
Output: []
 

Constraints:

k == lists.length
0 <= k <= 104
0 <= lists[i].length <= 500
-104 <= lists[i][j] <= 104
lists[i] is sorted in ascending order.
The sum of lists[i].length will not exceed 104.
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
// Time Complexity: Assume shift method can be done in O(1) time, we will have O(nlogK) where n is the max length of linkedList and K is the number of linkedList
// Space Complexity: O(1)
function mergeKLists(lists) {
  // Merge every two lists
  while (lists.length > 1) {
    const list1 = lists.shift();
    const list2 = lists.shift();
    lists.push(mergeSortedList(list1, list2));
  }
  return lists[0] || null;
}

function mergeSortedList(list1, list2) {
  // Initialize mergeList:
  const mergeList = new ListNode();
  let cur = mergeList;
  // Traverse through list1 and list2:
  while (list1 && list2) {
    if (list1.val < list2.val) {
      cur.next = list1;
      // Update pointers
      cur = cur.next;
      list1 = list1.next;
    } else {
      cur.next = list2;
      // Update pointers
      cur = cur.next;
      list2 = list2.next;
    }
  }
  cur.next = list1 || list2;
  return mergeList.next;
}

// function listNodeConstruct(arr) {
//   const Dummy = new ListNode();
//   let cur = Dummy;
//   arr.forEach((e) => {
//     cur.next = new ListNode(e);
//     cur = cur.next;
//   });
//   return Dummy.next;
// }
// list1 = listNodeConstruct([1, 4, 5]);
// console.log(list1);
// list2 = listNodeConstruct([1, 3, 4]);
// console.log(list2);
// list3 = listNodeConstruct([2, 6]);
// console.log(list3);
// console.log(mergeKLists([list1, list2, list3]));
// console.log(mergeKLists([]));
// console.log(mergeSortedList(list1));
// console.log(mergeSortedList(list1, list2));
