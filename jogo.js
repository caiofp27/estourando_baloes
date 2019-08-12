var timerId = null; //variavel que armazena a chamada da funcao timeout - controla o tempo
function iniciaJogo(){
	var url = window.location.search;
	var nivel_jogo = url.replace("?","");
	var tempo_segundos = 0;
	if(nivel_jogo == 1){//fácil > 120 s
		tempo_segundos = 120;
	}
	if(nivel_jogo == 2){//normal > 60 s
		tempo_segundos = 60;
	}
	if(nivel_jogo == 3){//dificil > 30 s
		tempo_segundos = 30;
	}	
	//inserindo os segundos no span > imagem
	document.getElementById("cronometro").innerHTML=tempo_segundos;
	//criando os balões
	var qnde_baloes = 80;
	cria_baloes(qnde_baloes);
	//imprimir quantidade de baloes inteiro
	document.getElementById('baloes_inteiros').innerHTML=qnde_baloes;
	//imprimir quantidade de baloes iestourados
	document.getElementById('baloes_estourados').innerHTML=0;
	contagem_tempo(tempo_segundos+1)
}
function contagem_tempo(segundos){
	segundos = segundos - 1;
	if(segundos == -1){
		clearTimeout(timerId); //para a execução da função do settimeout
		game_over();
		return false;
	}
	document.getElementById('cronometro').innerHTML = segundos;
	timerId = setTimeout("contagem_tempo("+segundos+")", 1000);
}
function game_over(){
	alert('Fim de jogo, você não conseguiu estourar todos os balões a tempo');
}
function cria_baloes(qnde_baloes){
	for (var i = 1; i <= qnde_baloes; i++ ){
		var balao = document.createElement("img");
		balao.src= 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.id = "b"+i;

		balao.onclick = function(){estourar(this);}

		document.getElementById('cenario').appendChild(balao);
	}
}
function estourar(e){
	var id_balao = e.id;
	document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourado.png";
	pontuacao(-1);
	document.getElementById(id_balao).setAttribute("onclick","");
}
function pontuacao(acao){
	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;
	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros, baloes_estourados);
}
function situacao_jogo (baloes_inteiros){
	if (baloes_inteiros == 0){
		alert('Parabéns você conseguiu estourar todos os balões a tempo!');
		parar_jogo();
	}
}
function parar_jogo(){
	clearTimeout(timerId);
}