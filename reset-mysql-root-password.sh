# Stop the MySQL service:
sudo /etc/init.d/mysql stop

# Create directory for mysql:
sudo mkdir /var/run/mysqld

# Change owner of directory:
sudo chown mysql:mysql /var/run/mysqld

# Start MySQL withuout grant tables:
sudo mysqld_safe --skip-grant-tables &

# Reset MySQL root password:
mysql -u root -e "use mysql;update user set authentication_string=PASSWORD('toor') where User='root'; flush privileges; quit;"

