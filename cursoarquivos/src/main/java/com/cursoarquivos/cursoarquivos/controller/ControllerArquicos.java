package com.cursoarquivos.cursoarquivos.controller;

import com.cursoarquivos.cursoarquivos.api.Disco;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
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
    public String modalHome() {
        return "/index.html";
    }

    /*
     * @ResponseBody
     * 
     * @RequestMapping(method = RequestMethod.POST, value = "/arquivo/salvar",
     * consumes = "multipart/form-data; boundary")
     * public ResponseEntity<?> salvarImagem2(@RequestParam("file") MultipartFile
     * file) {
     * 
     * System.out.println("kkkkkkkkkkkkkkkkkk");
     * 
     * disco.salvarFoto(file);
     * String mensagem = "<body style='background-color:black;'>" +
     * "<a href='/home' style='padding:20px 20px; color:white; text-decoration:none;'>MENSAGEM ENVIADA, RETORNAR</a>"
     * +
     * "</body>";
     * return ResponseEntity.ok().body(mensagem);
     */

    @ResponseBody
    @RequestMapping(method = RequestMethod.POST, value = "/arquivo/salvar")
    public ResponseEntity<?> salvarArquivo(@RequestParam("file") MultipartFile file) {
        disco.salvarArquivo(file);
        String mensagem = "<body style='background-color:black;'>" +
                "<a href='/home' style='padding:20px 20px; color:white; text-decoration:none;'>MENSAGEM ENVIADA, RETORNAR</a>"
                +
                "</body>";
        return ResponseEntity.ok().body(mensagem);
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.POST, value = "/arquivos/salvar")
    public ResponseEntity<?> salvarArquivos(@RequestParam("files") MultipartFile files[]) {

        try {
            disco.salvarArquivos(files);
            String mensagem = "<body style='background-color:black;'>" +
                    "<a href='/home' style='padding:20px 20px; color:white; text-decoration:none;'>MENSAGEM ENVIADA, RETORNAR</a>"
                    +
                    "</body>";
            return ResponseEntity.ok().body(mensagem);
        } catch (Exception e) {
            return ResponseEntity.ok().body(e.getLocalizedMessage());
        }
    }

    @PostMapping("/informacoes/arquivos/salvar")
    public ResponseEntity<?> salvarInformacoes(@RequestParam("filestext") MultipartFile filestext[], String nome,
            String cpf) {

        System.out.println(nome + "       |       " + cpf);

        try {
            disco.salvarArquivos(filestext);
            String mensagem = "<body style='background-color:black; color:white;'>" +
                    "<a href='/home' style='padding:20px 20px; color:white; text-decoration:none;'>MENSAGEM ENVIADA, RETORNAR</a>"
                    +
                    "<br><h1>" + nome + "</h1><br><h1>" + cpf + "</h1><br></body>";
            return ResponseEntity.ok().body(mensagem);
        } catch (Exception e) {
            return ResponseEntity.ok().body("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk "+e.getLocalizedMessage());
        }
    }

}
