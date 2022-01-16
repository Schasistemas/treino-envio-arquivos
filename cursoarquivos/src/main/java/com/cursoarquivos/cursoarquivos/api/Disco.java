package com.cursoarquivos.cursoarquivos.api;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class Disco {

	private File diretorio = new File("");

	private String caminho = diretorio.getAbsolutePath().replace("\\", "/") + "/src/main/resources/arquivo";

	public void salvarArquivo(MultipartFile arquivo) {

		Path diretorioPath = Paths.get(caminho);
		Path arquivoPath = diretorioPath.resolve(arquivo.getOriginalFilename());

		try {
			File diretorioFile = new File(this.caminho);
			diretorioFile.mkdirs();
			arquivo.transferTo(arquivoPath.toFile());
		} catch (Exception e) {
			System.out.println("ERRRRROOOOOOOOOOO: " + e.getLocalizedMessage());
		}
	}

	public void salvarArquivos(MultipartFile filestext[]) {

		Path diretorioPath = Paths.get(caminho);

		for (int i = 0; i < filestext.length; i++) {
			Path arquivoPath = diretorioPath.resolve(filestext[i].getOriginalFilename());

			try {
				File diretorioFile = new File(this.caminho);
				diretorioFile.mkdirs();
				filestext[i].transferTo(arquivoPath.toFile());
			} catch (Exception e) {
				System.out.println("ERRRRROOOOOOOOOOO: " + e.getLocalizedMessage());
			}
		}

	}

}
