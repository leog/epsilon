# epsilon
Web UI Architecture to handle a large AngularJS application.

Featured in my blog on a post series:

0. [**Introduction**](http://leog.me/log/large-angularjs-app-introduction): Why did I started this
1. [**Conventions**](http://leog.me/log/large-angularjs-app-conventions): Be sure to have them if you want to succeed
2. [**Environment**](http://leog.me/log/large-angularjs-app-environment): Yeoman (which includes GruntJS and Bower) over NodeJS
3. [**Abstractions**](http://leog.me/log/large-angularjs-app-abstractions): Handling 3 basic abstractions to implement everything
4. [**Components**](http://leog.me/log/large-angularjs-app-components): Developing components to use and reuse across abstractions
5. **Testing**: Karma and Jasmine using RequireJS
6. **Minification**: Using RequireJS minification tool r.js over this complex architecture
7. **Distribution**: Alternatives to distribute your code to other teams

## Online demo
1. Open the browser and navigate to http://leog.github.io/epsilon

## Local demo
1. In terminal run `grunt server`
2. Open a browser and navigate to http://127.0.0.1

## Running Tests
- To run the Jasmine unit test suite in terminal, use `grunt jasmine`
- To run Jasmine unit test suite in the browser (for better debugging)
     1. Ensure that the test server is running: grunt connect:test:keepalive
     2. Open a browser and navigate to http://localhost:8888/_SpecRunner.html
