#include "include/crow_all.h"
#include <iostream>
#include <string>

const std::string ReadFile(const std::string& path) {
  std::ifstream read_file(path, std::ios::binary);

  if (!read_file) {
    return " ";
  }

  return std::string(
    (std::istreambuf_iterator<char>(read_file)),
    std::istreambuf_iterator<char>());
}

int main() {
  crow::SimpleApp application;
  CROW_ROUTE(application, "/")([](){
   const std::string file = ReadFile("pong.html");
   if (file.empty()) {
     return crow::response(404);
   }
   return crow::response{file};
  });

  CROW_ROUTE(application, "/<string>")([](const std::string& page){
    const std::string file = page;
    const std::string content = ReadFile(file);
    if (content.empty()) {
      return crow::response(404);
    }
    return crow::response({content});
  });

  CROW_ROUTE(application, "/sounds/<string>")([](const std::string& sound){
    const std::string file = "sounds/" + sound;
    const std::string content = ReadFile(file);
    crow::response response;
    response.body = std::move(content);
    response.set_header("Content-Type", "audio/mpeg");
    return response;
  });

  application.port(5500).multithreaded().run();
  return 0;
}

// run with: g++ server.cc -o server -I include -I ../crud/people_network/include/Crow/include -pthread
