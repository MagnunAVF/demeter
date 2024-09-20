provider "aws" {
  region = "us-east-1"
}

resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "rds-subnet-group"
  subnet_ids = ["SET_VAR_SUBNET1_ID", "SET_VAR_SUBNET2_ID"]

  tags = {
    Name = "rds-subnet-group"
  }
}

resource "aws_security_group" "rds_security_group" {
  name        = "allow-postgres"
  description = "Allow PostgreSQL traffic"
  vpc_id      = "SET_VAR_VPC1_ID"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "allow-postgres"
  }
}

resource "aws_db_instance" "postgres_instance" {
  identifier        = "low-cost-postgres"
  allocated_storage = 20
  instance_class    = "db.t3.micro"
  engine            = "postgres"
  engine_version    = "16.4"
  username          = "SET_VAR_DB_USER"
  password          = "SET_VAR_DB_PASS"
  port              = 5432
  publicly_accessible = false
  multi_az          = false

  db_subnet_group_name = aws_db_subnet_group.rds_subnet_group.name
  vpc_security_group_ids = [aws_security_group.rds_security_group.id]

  skip_final_snapshot = true

  tags = {
    Name = "low-cost-postgres"
  }
}

output "rds_endpoint" {
  value = aws_db_instance.postgres_instance.endpoint
}

output "rds_port" {
  value = aws_db_instance.postgres_instance.port
}
