package entity

import "github.com/BenIzak/ChatXperience/project/src/ws"

type Reference struct {
	User          *User
	Group         *Group
	UsersGroup    *UsersGroup
	Message       *Message
	CreateRoomReq *ws.CreateRoomReq
}
