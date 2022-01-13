package com.cursoarquivos.cursoarquivos.api;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class Disco {

	private File diretorio = new File("");

	private String caminho = diretorio.getAbsolutePath().replace("\\", "/")+"/src/main/resources/arquivos";
	
	public void salvarFoto(MultipartFile foto) {

		Path diretorioPath = Paths.get(caminho);
		Path arquivoPath = diretorioPath.resolve(foto.getOriginalFilename());

		try {
			File diretorioFile = new File(this.caminho);
			diretorioFile.mkdirs();
			foto.transferTo(arquivoPath.toFile());
		} catch (Exception e) {
			
		}
	}
	
}
