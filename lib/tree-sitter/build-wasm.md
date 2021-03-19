# Build `tree-sitter-cpp.wasm`

### Dependencies
- Docker


### Download the tree-sitter binary
Find it for your platform at https://github.com/tree-sitter/tree-sitter/releases

Uncompress it and make it executable. Here's an example for mac.
```
$ gunzip tree-sitter-macos-x64.gz
$ chmod +x tree-sitter-macos-x64
```

### Build the wasm
Start Docker and then run (from this folder)
```
./tree-sitter-macos-x64 build-wasm ../../node_modules/tree-sitter-cpp
```
