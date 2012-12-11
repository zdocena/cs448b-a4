# import xml parser
from xml.dom.minidom import parseString
from xml.etree import ElementTree as ET

f = open('input_files/greek2.graphml', 'r')
data = f.read()
f.close()
dom = parseString(data)
jsonArray = []

# get article nodes
for node in dom.getElementsByTagName('node'):
  json = {"x": "",
          "y": "",
          "title": "",
          "date": ""}
          
  # iterate over node tags
  for data_elem in node.getElementsByTagName('data'):
    attr = data_elem.attributes["key"].value
    if attr == "label":
      attr = "title"
    
    # add data value to json object
    if attr in json:
      json[attr] = data_elem.firstChild.nodeValue
      
  jsonArray.append(json)
  
for x in jsonArray:
  print x
