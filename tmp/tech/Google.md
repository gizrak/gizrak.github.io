---
date: 2024-02-13 11:13:55
created: 2023-06-14 00:24:22
categories:
- 프로젝트
---

# Google

```java
Please use this Google doc to code during your interview. To free your hands for coding, we recommend that you use a headset or a phone with speaker option.


String[] arr = “-12.34”.split(‘.’)
arr[0] = “-12” -> 12
arr[1] = “34” -> 0.34

atof("-12.34") = -12.34 (float type)

parseInt() --> x
parseFloat() --> x

sign: - 
point: .
number: 123

minus counter : 2
stack : 1, 2, 3, 4

4 * 10^-2 = 0.04
3 * 10^-1 = 0.3
2 * 10^0 = 2
1 * 10^1 = 10

sum * -1

stack push : O(n)
stack pop : O(n)
O(2n+1) = O(n)


private static final char SIGN = ‘-’;
private static final char POINT = ‘.’;

public static float atof(final String str) { // str="1.23"
boolean isMinus = false;
boolean isCount = false;
integer counter = 0;
	Stack<Integer> st = new Stack<>();

	if (str.charAt(0) == SIGN) {
		isMinus = true;
	}

	// push into parse stack
	for (int i=0; i<StringUtils.length(str); i++) {
		char ch = str.charAt(i);
		if (isCount) {
			counter++;
		}
		if (ch == SIGN) {
			continue;
		} else if (ch == POINT) {
			isCount = true;
		} else {
			st.push(str.charAt(i));
		}
	}

	// pop and calculate sum
	float sum = 0f;
	int stackSize = st.size();
	for (int i=0; i<stackSize; i++) {
		int number = st.pop();
		sum += number * Math.pow(10, -1 * counter);
		counter--;
	}

	return isMinus ? sum * -1  : sum;
}

isCount = true
count = 2
stack : 1, 2, 3

sum = 1.23
counter = -1
number = 1
1 * 10^(-1*0) = 1*10^0 = 1
```

<br>