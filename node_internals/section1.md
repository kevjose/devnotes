# The internals of node js

- Javascript code -> NodeJs -> V8(open source JS engine, makes JS executable outside browser), libuv(C++ project, gives access of operating system, networking and some amount of concurrency to NodeJS)
- Purpose of NodeJS, (why not directly V8 and libuv), some of these internal libraries are not at all JS , V8 is part JS part C++, libuv is 100% C++, as JS dev we want to write JS code, this is why NoedJS, this provides a unified interface to be used by JS devs (these interface can be standard libs like fs, http for networking etc.)

#### Module Implementation

- Pick a function in Node standard library, find where its implemented in the Node source code, see how v8 and libuv are used to implement the function
- pick a function from crypto library in nodejs i.e. pbkdf2 function (takes password, salt and other options and creates a hash)
- github.com/nodejs/node -> lib(JS side this is from we require functions), src(C++ implementations)
- lib-> internal-> crypto -> pbkdf2 function (returns \_pbkdf2(password, salt, iterations, kyelen ...)) -> PBKDF2(....), this is a C++ function (check the unfamiliar looking import `const {PBKDF2} = process.binding('crypto')`)
- JS code we write -> Node's JS side ie lib folder in node repo -> process.binding() ,connects JS and C++ functions -> V8, converts values between JS and C++ world -> Node's C++ side in src folder in node repo -> libuv, gives node easy access to underlying OS
- src -> node_crypto.cc -> search (env-> SetMethod(target, "PBKDF2", PBKDF2 )), this is an export statement
- actual code can be found at `void PBKDF2(const FunctionCallbackInfo<Value>&args) { ....`
- the `using V8::Array` etc statement signifies that the V8 acts as the intermediary that converts the JS to C++ equivalents
- V8 is used to interpret and execute JS code, while libuv is used for accessing the filesystem and some aspects of concurrency

#### Basics of threads

- the event loop is used by node to handle asynchronus code.
- detour to discuss threads,
- Process(instance of a running program) -> withing a program we can have multiple threads, a thread can be pictured as a list of todos, that has steps to be executed by the CPU of the computer, this thread is given to CPU and CPU tries to execute one instruction at a time, top to bottom,
- a single process can have multiple process inside of it (check activity monitor to list out different processes, on bottom right it shows number of threads), interesting area of study around thread is scheduling, its the OS capability to decide which thread should be processed at a given time
- Computer has limited amount of resources, CPU can only process n instructions per second, OS scheduler decides which thread should be processed (urgent thread should not be kept waiting)
- to making scheduling efficient we can have more CPU cores, allowing multiple threads to be proccessed at the same time, technically one core can process more than one thread by using multithreading, or hyperthreading
- another way to do this (relevant to JS world), consider a io thread and another thread having a multiplication task. IO consumes non zero time while IO is performed CPU waits, during wait io thread has nothing to do, idle, OS scheduler can detect this wait, and assing thread 2 ie multiply task to be processed

#### Node Event Loop

-
