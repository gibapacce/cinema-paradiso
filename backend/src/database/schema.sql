CREATE DATABASE IF NOT EXISTS cinema_db;
USE cinema_db;

-- Tabela Filmes
CREATE TABLE filme (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  genero VARCHAR(100),
  duracao INT,
  ativo BOOLEAN DEFAULT true
);

-- Tabela Salas
CREATE TABLE sala (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  capacidade INT NOT NULL
);

-- Tabela Sessões
CREATE TABLE sessao (
  id INT PRIMARY KEY AUTO_INCREMENT,
  filme_id INT,
  sala_id INT,
  data DATE NOT NULL,
  horario TIME NOT NULL,
  ativa BOOLEAN DEFAULT true,
  FOREIGN KEY (filme_id) REFERENCES filme(id),
  FOREIGN KEY (sala_id) REFERENCES sala(id)
);

-- Tabela Assentos
CREATE TABLE assento (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sala_id INT,
  numero VARCHAR(10) NOT NULL,
  fileira VARCHAR(10) NOT NULL,
  disponivel BOOLEAN DEFAULT true,
  FOREIGN KEY (sala_id) REFERENCES sala(id)
);

-- Tabela Reservas
CREATE TABLE reserva (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sessao_id INT,
  assento_id INT,
  data_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'confirmada',
  FOREIGN KEY (sessao_id) REFERENCES sessao(id),
  FOREIGN KEY (assento_id) REFERENCES assento(id),
  UNIQUE KEY unique_reserva (sessao_id, assento_id)
);

-- Inserir dados iniciais
INSERT INTO filme (nome, genero, duracao) VALUES
('Avatar: O Caminho da Água', 'Ficção Científica', 192),
('Top Gun: Maverick', 'Ação', 131),
('Homem-Aranha', 'Ação', 148);

INSERT INTO sala (nome, capacidade) VALUES
('Sala 1', 50),
('Sala Premium', 30);

INSERT INTO sessao (filme_id, sala_id, data, horario) VALUES
(1, 1, '2025-08-22', '14:30:00'),
(1, 1, '2025-08-22', '19:00:00'),
(2, 2, '2025-08-22', '16:00:00');

-- Gerar assentos para Sala 1 (5 fileiras, 10 assentos cada)
INSERT INTO assento (sala_id, numero, fileira) VALUES
(1, '1', 'A'), (1, '2', 'A'), (1, '3', 'A'), (1, '4', 'A'), (1, '5', 'A'),
(1, '6', 'A'), (1, '7', 'A'), (1, '8', 'A'), (1, '9', 'A'), (1, '10', 'A'),
(1, '1', 'B'), (1, '2', 'B'), (1, '3', 'B'), (1, '4', 'B'), (1, '5', 'B'),
(1, '6', 'B'), (1, '7', 'B'), (1, '8', 'B'), (1, '9', 'B'), (1, '10', 'B');
-- Continuar para fileiras C, D, E...