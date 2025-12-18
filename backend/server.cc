#include "../include/crow_all.h"
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

const std::string GetMimeType(const std::string& path) {
  if (path.ends_with(".html")) {
    return "text/html";
  } else if (path.ends_with(".css")) {
    return "text/css";
  } else if (path.ends_with(".js")) {
    return "application/javascript";
  } else if (path.ends_with(".json")) {
    return "application/manifest+json";
  } else if (path.ends_with(".png")) {
    return "image/png";
  } else if (path.ends_with(".mp3")) {
    return "audio/mpeg";
  }
  return "application/octet-stream";
}

int main() {
  crow::SimpleApp application;
  CROW_ROUTE(application, "/")([](){
   const std::string file = ReadFile("index.html");
   if (file.empty()) {
     return crow::response(404);
   }
   return crow::response{file};
  });

  CROW_ROUTE(application, "/<path>")([](
    const crow::request&, crow::response& response, std::string path) {
    if (path.empty()) {
      path = "index.html";
    }

    const std::string content = ReadFile(path);
    if (content.empty()) {
      response.code = 404;
      response.end();
      return;
    }

    response.set_header("Content-Type", GetMimeType(path));
    response.body = content;
    response.end();
  });

  application.port(1600).ssl_file("cert.pem", "key.pem").multithreaded().run();

  /*ADD MIME TYPE TO MANIFEST!!!
   * EX) {"Content-Type" : "type/file"}
   */
  return 0;
}
