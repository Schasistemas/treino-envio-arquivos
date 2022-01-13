package com.cursoarquivos.cursoarquivos.controller;

import javax.websocket.server.PathParam;

import com.cursoarquivos.cursoarquivos.api.Disco;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/")
public class ControllerArquicos {
 
    @Autowired
    private Disco disco;

    @RequestMapping(method = RequestMethod.GET, value = "/home")
    public String modalHome(){
        return "/index.html";
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.POST, value = "/salvar")
   public ResponseEntity<?> salvarImagem(@RequestParam("foto") MultipartFile foto){
       disco.salvarFoto(foto);
       String mensagem = "<body style='background-color:black;'>"+
       "<a href='/home' style='padding:20px 20px; color:white;'>MENSAGEM ENVIADA, RETORNAR</a>"+
       "</body>";
        return ResponseEntity.ok().body(mensagem);
   }

}
