// 721. Accounts Merge

/**
 * Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, and the rest of the elements are emails representing emails of the account.

Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the same name.

After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails in sorted order. The accounts themselves can be returned in any order.

 

Example 1:

Input: accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
Output: [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
Explanation:
The first and second John's are the same person as they have the common email "johnsmith@mail.com".
The third John and Mary are different people as none of their email addresses are used by other accounts.
We could return these lists in any order, for example the answer [['Mary', 'mary@mail.com'], ['John', 'johnnybravo@mail.com'], 
['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com']] would still be accepted.
Example 2:

Input: accounts = [["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]]
Output: [["Ethan","Ethan0@m.co","Ethan4@m.co","Ethan5@m.co"],["Gabe","Gabe0@m.co","Gabe1@m.co","Gabe3@m.co"],["Hanzo","Hanzo0@m.co","Hanzo1@m.co","Hanzo3@m.co"],["Kevin","Kevin0@m.co","Kevin3@m.co","Kevin5@m.co"],["Fern","Fern0@m.co","Fern1@m.co","Fern5@m.co"]]
 

Constraints:

1 <= accounts.length <= 1000
2 <= accounts[i].length <= 10
1 <= accounts[i][j].length <= 30
accounts[i][0] consists of English letters.
accounts[i][j] (for j > 0) is a valid email.
 */

// Need to review union find

// This is a union find problem
// n = # of accounts & m = average email length
// Time Complexity: O(n * m * unionFind) for group and ranking email for each account name + O(n * m * log(n*m)) for merging all emails based on its parents and log(n*m) is for sorting the emails
// Space Complexity: O(n * m)
type emailRank = Record<string, { parent: string; ranking: number }>;
function accountsMerge(accounts: string[][]): string[][] {
  // Loop through the accounts
  const groupByName: Record<string, emailRank> = {};
  for (const [name, ...emails] of accounts) {
    // If name not in grouping, initialize the group
    if (!(name in groupByName)) groupByName[name] = {};
    const group: emailRank = groupByName[name];
    // Rank 1st Email:
    const firstEmail = emails[0];
    if (!(firstEmail in group))
      group[firstEmail] = { parent: firstEmail, ranking: 1 };
    // Rank remaining emails based on first email
    for (let i = 1; i < emails.length; i++) {
      // if email does not exist, intialize:
      if (!(emails[i] in group))
        group[emails[i]] = { parent: emails[i], ranking: 1 };

      // Find top parent
      const p1: string = find(firstEmail, group);
      const p2: string = find(emails[i], group);
      if (p1 === p2) continue;
      group[p1].ranking >= group[p2].ranking
        ? union(p1, p2, group)
        : union(p2, p1, group);
    }
  }
  // console.log(groupByName);
  const result: string[][] = [];

  for (const name in groupByName) {
    const emails = merge(groupByName[name]);
    for (const email of emails) result.push([name, ...email.sort()]);
  }

  return result;
  function find(p: string, group: emailRank): string {
    const { parent } = group[p];
    if (p === parent) return parent;
    return find(parent, group);
  }

  function union(p1: string, p2: string, group: emailRank) {
    // Update rank:
    group[p1].ranking += group[p2].ranking;
    group[p2].ranking = 0;
    // Update parent:
    group[p2].parent = p1;
  }
  function merge(group: emailRank): string[][] {
    const emails: Record<string, string[]> = {};
    for (const email in group) {
      const parent = find(email, group);
      emails[parent] = emails[parent] ?? [];
      emails[parent].push(email);
    }
    return Object.values(emails);
  }
}
const accounts = [
  ['David', 'David0@m.co', 'David1@m.co'],
  ['David', 'David3@m.co', 'David4@m.co'],
  ['David', 'David4@m.co', 'David5@m.co'],
  ['David', 'David2@m.co', 'David3@m.co'],
  ['David', 'David1@m.co', 'David2@m.co'],
];

console.log(accountsMerge(accounts));
